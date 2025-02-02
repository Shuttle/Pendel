# Walthrough

We'll be using Sql Server for this walkthrough.  The data access to store the projection output and makes use of the [Shuttle.Core.Data](http://localhost:5173/shuttle-core/shuttle-core-data.html) package for data access, but this part could be replaced by any mechanism you require.

## Database

If you are using docker you can quickly get up-and-running with the following:

```
docker run -d --name sql -h sql -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Pass!000" -e "MSSQL_PID=Express" -p 1433:1433 -v C:\SQLServer.Data\:/var/opt/mssql/data mcr.microsoft.com/mssql/server:2019-latest
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

## Server

Although not a requirement for a sample such as this, having a hosted environment for the event processing does make things simpler to configure.

Add a `Console App` to the solution called `Recall.Walkthrough.Server` and then add the following NuGet packages:

```
Microsoft.Data.SqlClient
Shuttle.Recall.Sql.EventProcessing
```

Also add a reference to the `Recall.Walkthrough` domain project.

The `Shuttle.Recall.Sql.EventProcessing` package will include all the required transitive packages.

Once events are stored as `PrimitiveEvent` records, the event processor will find any events that have not yet been applied to a projection and invoke either an `IEventHandler` implementation, or a matching delegate.

For the events on our `Customer` related to names we'll use delegates, and for the location changes we'll use an explicit event handler class (we'll add the DDL to create the `Customer` table next):

```c#
using System.Data;
using Shuttle.Core.Data;
using Shuttle.Recall;

namespace Recall.Walkthrough.Server;

public class CustomerEventHandler : IEventHandler<Customer.Moved>
{
    private readonly IDatabaseContextFactory _databaseContextFactory;

    public CustomerEventHandler(IDatabaseContextFactory databaseContextFactory)
    {
        _databaseContextFactory = databaseContextFactory;
    }

    public async Task ProcessEventAsync(IEventHandlerContext<Customer.Moved> context)
    {
        await using (var databaseContext = _databaseContextFactory.Create())
        {
            await databaseContext.ExecuteAsync(new Query(@"
UPDATE
    Customer
SET
    Location = @Location
WHERE
    Id = @Id
")
                .AddParameter(new Column<string>("Location", DbType.AnsiString), context.Event.Location)
                .AddParameter(new Column<Guid>("Id", DbType.Guid), context.PrimitiveEvent.Id)
            );
        }
    }
}
```

To create the database structures, add a class called `ServerHostedService` that contains the following code:

```c#
using Microsoft.Extensions.Hosting;
using Shuttle.Core.Data;

namespace Recall.Walkthrough.Server;

public class ServerHostedService : IHostedService
{
    private readonly IDatabaseContextFactory _databaseContextFactory;

    public ServerHostedService(IDatabaseContextFactory databaseContextFactory)
    {
        _databaseContextFactory = databaseContextFactory;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await using (var databaseContext = _databaseContextFactory.Create())
        {
            await databaseContext.ExecuteAsync(new Query(@"
IF NOT EXISTS 
(
    SELECT 
        NULL
    FROM 
        sys.objects 
    WHERE 
        object_id = OBJECT_ID(N'[dbo].[Customer]') 
    AND 
        type = N'U'
)
BEGIN
    CREATE TABLE [dbo].[Customer] 
    (
        [Id] UNIQUEIDENTIFIER NOT NULL,
        [Name] VARCHAR (200) NOT NULL,
        [Location] VARCHAR (200) NULL
    );
END

IF NOT EXISTS
(
    SELECT
        NULL
    FROM 
        information_schema.table_constraints  
    WHERE 
        constraint_type = 'PRIMARY KEY'   
    AND 
        table_name = 'Customer'
)
BEGIN
    ALTER TABLE [dbo].[Customer] ADD CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
    (
	    [Id] ASC
    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
END
"), cancellationToken: cancellationToken);
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
using System.Data;
using Microsoft.Data.SqlClient;
using System.Data.Common;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Shuttle.Core.Data;
using Shuttle.Recall;
using Shuttle.Recall.Sql.EventProcessing;
using Shuttle.Recall.Sql.Storage;

namespace Recall.Walkthrough.Server;

internal class Program
{
    private static async Task Main(string[] args)
    {
        DbProviderFactories.RegisterFactory("Microsoft.Data.SqlClient", SqlClientFactory.Instance);

        await Host.CreateDefaultBuilder()
            .ConfigureServices(services =>
            {
                services
                    .AddHostedService<ServerHostedService>()
                    .AddDataAccess(builder =>
                    {
                        builder.AddConnectionString(
                            "RecallWalkthrough",
                            "Microsoft.Data.SqlClient",
                            "Server=.;Database=RecallWalkthrough;User ID=sa;Password=Pass!000;Trust Server Certificate=true");
                        builder.Options.DatabaseContextFactory.DefaultConnectionStringName = "RecallWalkthrough";
                    })
                    .AddSqlEventStorage(builder =>
                    {
                        builder.Options.ConnectionStringName = "RecallWalkthrough";
                        builder.Options.Schema = "recall";

                        builder.UseSqlServer();
                    })
                    .AddSqlEventProcessing(builder =>
                    {
                        builder.Options.ConnectionStringName = "RecallWalkthrough";
                        builder.Options.Schema = "recall";
                        builder.Options.RegisterDatabaseContextObserver = false; // we'll handle connections

                        builder.UseSqlServer();
                    })
                    .AddEventStore(builder =>
                    {
                        builder.Options.ProjectionThreadCount = 1;

                        builder.AddProjection("Customer")
                            .AddEventHandler(async (IEventHandlerContext<Customer.Registered> context, IDatabaseContextFactory databaseContextFactory) =>
                            {
                                await using (var databaseContext = databaseContextFactory.Create())
                                {
                                    await databaseContext.ExecuteAsync(new Query(@"
INSERT INTO [dbo].[Customer]
(
    Id,
    Name
)
VALUES
(
    @Id,
    @Name
)
")
                                        .AddParameter(new Column<string>("Name", DbType.AnsiString), context.Event.Name)
                                        .AddParameter(new Column<Guid>("Id", DbType.Guid), context.PrimitiveEvent.Id)
                                    );
                                }
                            })
                            .AddEventHandler(async (IEventHandlerContext<Customer.Renamed> context, IDatabaseContextFactory databaseContextFactory) =>
                            {
                                await using (var databaseContext = databaseContextFactory.Create())
                                {
                                    await databaseContext.ExecuteAsync(new Query(@"
UPDATE
    Customer
SET
    Name = @Name
WHERE
    Id = @Id
")
                                        .AddParameter(new Column<string>("Name", DbType.AnsiString), context.Event.Name)
                                        .AddParameter(new Column<Guid>("Id", DbType.Guid), context.PrimitiveEvent.Id)
                                    );
                                }
                            });

                        builder.AddProjection("Address").AddEventHandler<CustomerEventHandler>();
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
Microsoft.Data.SqlClient
Shuttle.Recall.Sql.Storage
```

```c#
using Microsoft.Data.SqlClient;
using System.Data.Common;
using Microsoft.Extensions.DependencyInjection;
using Shuttle.Core.Data;
using Shuttle.Recall;
using Shuttle.Recall.Sql.Storage;

namespace Recall.Walkthrough.Shell;

internal class Program
{
    static async Task Main(string[] args)
    {
        DbProviderFactories.RegisterFactory("Microsoft.Data.SqlClient", SqlClientFactory.Instance);

        var serviceProvider = new ServiceCollection()
            .AddDataAccess(builder =>
            {
                builder.AddConnectionString(
                    "RecallWalkthrough",
                    "Microsoft.Data.SqlClient",
                    "Server=.;Database=RecallWalkthrough;User ID=sa;Password=Pass!000;Trust Server Certificate=true");
                builder.Options.DatabaseContextFactory.DefaultConnectionStringName = "RecallWalkthrough";
            })
            .AddSqlEventStorage(builder =>
            {
                builder.Options.ConnectionStringName = "RecallWalkthrough";
                builder.Options.Schema = "recall";

                builder.UseSqlServer();
            })
            .AddEventStore()
            .BuildServiceProvider();

        var eventStore = serviceProvider.GetRequiredService<IEventStore>();

        // In a hosted environment the `Shuttle.Recall.Sql.Storage.EventStoreHostedService` will register
        // a `DatabaseContextObserver` that will create a `DatabaseContext` when one is not present.
        // We could instantiate the `EventStoreHostedService` but let's create the connection directly.

        var databaseContextFactory = serviceProvider.GetRequiredService<IDatabaseContextFactory>();

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

            await using (databaseContextFactory.Create())
            {
                await eventStore.SaveAsync(eventStream);
            }

            ids.Add(eventStream.Id);
        }

        await using (databaseContextFactory.Create())
        {
            foreach (var id in ids)
            {
                var eventStream = await eventStore.GetAsync(id);
                var customer = new Customer(id);

                eventStream.Apply(customer);

                Console.WriteLine($"[customer]: id = '{customer.Id}' / name = '{customer.Name}' (rename count = {customer.RenameCount}) / location = '{customer.Location}' (move count = '{customer.MoveCount}')");
            }
        }
    }
}
```

You should now be able to run the `Recall.Walkthrough.Shell` application.  You will notice in the database that the relevant events have been persisted in the `recall.PrimitiveEvent` table and the event types in `recall.EventType` table.  The `recall.Projection` tables will still be empty.

If you run the `Recall.Walkthrough.Server` application you will notice that the `recall.Projection` now contains the end sequence number for each projection, and `dbo.Customer` has been populated with relevant entries.