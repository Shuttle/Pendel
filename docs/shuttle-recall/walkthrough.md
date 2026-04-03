# Walthrough

## Database

If you are using docker you can quickly get up-and-running with the following:

```
docker run --network <network> --restart always -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Pass!000" -p 1433:1433 --name sqlserver --hostname sqlserver -v <data-drive>\sqlserver.data:/var/opt/mssql/data -v -d mcr.microsoft.com/mssql/server:2022-latest
```

We need a database to store our events and projections.  Create a database called `RecallWalkthrough` using your tooling of choice.

## Domain

Create a `Class Library` project called `Recall.Walkthrough` that represents our domain and add the following `Customer` class:

```c#
namespace Recall.Walkthrough;

public class Customer
{
    public Guid Id { get; }
    public string Name { get; private set; } = string.Empty;
    public int RenameCount { get; private set; }
    public string Location { get; set; } = string.Empty;
    public int MoveCount { get; set; }

    public Customer(Guid id)
    {
        Id = id;
    }

    public Registered Register(string name)
    {
        return On(new Registered
        {
            Name = name
        });
    }

    private Registered On(Registered registered)
    {
        Name = registered.Name;
        return registered;
    }

    public Renamed Rename(string name)
    {
        return On(new Renamed
        {
            Name = name
        });
    }

    public Moved MovedTo(string location)
    {
        return On(new Moved
        {
            Location = location
        });
    }

    private Moved On(Moved moved)
    {
        Location = moved.Location;
        MoveCount++;
        return moved;
    }

    public class Moved
    {
        public string Location { get; set; } = string.Empty;
    }

    private Renamed On(Renamed renamed)
    {
        Name = renamed.Name;
        RenameCount++;
        return renamed;
    }

    public class Renamed
    {
        public string Name { get; set; } = string.Empty;
    }

    public class Registered
    {
        public string Name { get; set; } = string.Empty;
    }
}
```

Our `Customer` aggregate can be registered, have its name change, and move.

## Data

Since we are going to use [Entity Framework](https://learn.microsoft.com/en-us/ef/core/) to store our projection, we need to define the `Customer` table in a way that EF Core can understand.

Add a class called `CustomerDbContext` to the domain project (you'll need the `Microsoft.EntityFrameworkCore` NuGet package):

```c#
using Microsoft.EntityFrameworkCore;

namespace Recall.Walkthrough;

public class CustomerDbContext(DbContextOptions<CustomerDbContext> options) : DbContext(options)
{
    public DbSet<CustomerEntity> Customers { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CustomerEntity>().ToTable("Customer").HasKey(x => x.Id);
    }
}

public class CustomerEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
}
```

## Server

Although not a requirement for a sample such as this, having a hosted environment for the event processing does make things simpler to configure.

Add a `Console App` to the solution called `Recall.Walkthrough.Server` and then add the following NuGet packages:

```
Microsoft.EntityFrameworkCore.SqlServer
Shuttle.Recall.SqlServer.EventProcessing
```

Also add a reference to the `Recall.Walkthrough` domain project.

The `Shuttle.Recall.Sql.EventProcessing` package will include all the required transitive packages.

Once events are stored as `PrimitiveEvent` records, the event processor will find any events that have not yet been applied to a projection and invoke either an `IEventHandler` implementation, or a matching delegate.

For the events on our `Customer` related to names we'll use delegates, and for the location changes we'll use an explicit event handler class (we'll add the DDL to create the `Customer` table next):

```c#
using Microsoft.EntityFrameworkCore;
using Shuttle.Recall;

namespace Recall.Walkthrough.Server;

public class CustomerEventHandler : IEventHandler<Customer.Moved>
{
    private readonly CustomerDbContext _dbContext;

    public CustomerEventHandler(CustomerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task ProcessEventAsync(IEventHandlerContext<Customer.Moved> context)
    {
        var customer = await _dbContext.Customers.FindAsync(context.PrimitiveEvent.Id);

        if (customer != null)
        {
            customer.Location = context.Event.Location;
            await _dbContext.SaveChangesAsync();
        }
    }
}
```

To create the database structures, add a class called `ServerHostedService` that contains the following code:

```c#
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Recall.Walkthrough.Server;

public class ServerHostedService : IHostedService
{
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public ServerHostedService(IServiceScopeFactory serviceScopeFactory)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using (var scope = _serviceScopeFactory.CreateScope())
        {
            await scope.ServiceProvider.GetRequiredService<CustomerDbContext>().Database.EnsureCreatedAsync(cancellationToken);
        }
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await Task.CompletedTask;
    }
}
```

We are now ready to configure the services, along with the `SqlClientFactory` provider factory which is used internally by the `Shuttle.Data.Core` package:

```c#
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Shuttle.Recall;
using Shuttle.Recall.SqlServer.EventProcessing;
using Shuttle.Recall.SqlServer.Storage;

namespace Recall.Walkthrough.Server;

internal class Program
{
    private static async Task Main(string[] args)
    {
        await Host.CreateDefaultBuilder()
            .ConfigureServices(services =>
            {
                var connectionString = "Server=.;Database=RecallWalkthrough;User ID=sa;Password=Pass!000;Trust Server Certificate=true";

                services
                    .AddHostedService<ServerHostedService>()
                    .AddDbContext<CustomerDbContext>(builder =>
                    {
                        builder.UseSqlServer(connectionString);
                    })
                    .AddRecall(recallBuilder =>
                    {
                        recallBuilder
                            .UseSqlServerEventStorage(builder =>
                            {
                                builder.Options.ConnectionString = connectionString;
                                builder.Options.Schema = "recall";
                            })
                            .UseSqlServerEventProcessing(builder =>
                            {
                                builder.Options.ConnectionString = connectionString;
                                builder.Options.Schema = "recall";
                            })
                            .AddProjection("Customer")
                            .AddEventHandler(async (IEventHandlerContext<Customer.Registered> context, CustomerDbContext dbContext) =>
                            {
                                await dbContext.Customers.AddAsync(new CustomerEntity
                                {
                                    Id = context.PrimitiveEvent.Id,
                                    Name = context.Event.Name
                                });

                                await dbContext.SaveChangesAsync();
                            })
                            .AddEventHandler(async (IEventHandlerContext<Customer.Renamed> context, CustomerDbContext dbContext) =>
                            {
                                var customer = await dbContext.Customers.FindAsync(context.PrimitiveEvent.Id);

                                if (customer != null)
                                {
                                    customer.Name = context.Event.Name;
                                    await dbContext.SaveChangesAsync();
                                }
                            });

                        recallBuilder.AddProjection("Address").AddEventHandler<CustomerEventHandler>();
                    });
            })
            .Build()
            .RunAsync();
    }
}
```

That should take care of our event processing.  We now need to move to producing events.

## Shell / Test

Add a new `Console App` called `Recall.Walkthrough.Shell` and then add the following NuGet packages:

```
Shuttle.Recall.SqlServer.Storage
```

```c#
using Microsoft.Extensions.DependencyInjection;
using Shuttle.Recall;
using Shuttle.Recall.SqlServer.Storage;

namespace Recall.Walkthrough.Shell;

internal class Program
{
    static async Task Main(string[] args)
    {
        var connectionString = "Server=.;Database=RecallWalkthrough;User ID=sa;Password=Pass!000;Trust Server Certificate=true";

        var serviceProvider = new ServiceCollection()
            .AddRecall(recallBuilder =>
            {
                recallBuilder.UseSqlServerEventStorage(builder =>
                {
                    builder.Options.ConnectionString = connectionString;
                    builder.Options.Schema = "recall";
                });
            })
            .BuildServiceProvider();

        var eventStore = serviceProvider.GetRequiredService<IEventStore>();

        var ids = new List<Guid>();

        for (var i = 0; i < 5; i++)
        {
            var eventStream = await eventStore.GetAsync(); // will create a new EventStream
            
            var customer = new Customer(eventStream.Id);

            eventStream.Add(customer.Register($"Customer-{i}-{eventStream.Id}"));
            eventStream.Add(customer.Rename($"Renamed-1-Customer-{i}-{eventStream.Id}"));
            eventStream.Add(customer.Rename($"Renamed-2-Customer-{i}-{eventStream.Id}"));
            eventStream.Add(customer.MovedTo($"Moved-1-Customer-{i}-{eventStream.Id}"));
            eventStream.Add(customer.MovedTo($"Moved-2-Customer-{i}-{eventStream.Id}"));

            await eventStore.SaveAsync(eventStream);

            ids.Add(eventStream.Id);
        }

        foreach (var id in ids)
        {
            var eventStream = await eventStore.GetAsync(id);
            var customer = new Customer(id);

            eventStream.Apply(customer);

            Console.WriteLine($"[customer]: id = '{customer.Id}' / name = '{customer.Name}' (rename count = {customer.RenameCount}) / location = '{customer.Location}' (move count = '{customer.MoveCount}')");
        }
    }
}
```

You should now be able to run the `Recall.Walkthrough.Shell` application.  You will notice in the database that the relevant events have been persisted in the `recall.PrimitiveEvent` table and the event types in `recall.EventType` table.  The `recall.Projection` tables will still be empty.

If you run the `Recall.Walkthrough.Server` application you will notice that the `recall.Projection` now contains the end sequence number for each projection, and `dbo.Customer` has been populated with relevant entries.