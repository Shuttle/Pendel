---
aside: false
---

# Getting Started

This guide demonstrates using Shuttle.Recall with a Sql Server implementation.

Start a new **Console Application** project called `RecallQuickstart` and select a Shuttle.Recall implementation:

> Install the `Shuttle.Recall.Sql.Storage` nuget package.

This provides a SQL-based store for doamin events.

> Install the `Microsoft.Data.SqlClient` nuget package.

This will provide a connection to our Sql Server.

Now we'll define the domain event that will represent a state change in the `Name` attribute:

```c#
public class Renamed
{
    public string Name { get; set; } = string.Empty;
}
```

Next we'll create our `Aggregate Root`.  In a real-world scenario the aggregate in our domain would be something like `Customer`, `Member`, `Invoice`, and so forth.  The aggregate will make use of an `EventStream` to save the changes in the state:

```c#
using System.Data.Common;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Shuttle.Core.Data;
using Shuttle.Recall;
using Shuttle.Recall.Sql.Storage;

namespace RecallQuickstart;

internal class Program
{
    private static async Task Main(string[] args)
    {
        DbProviderFactories.RegisterFactory("Microsoft.Data.SqlClient", SqlClientFactory.Instance);

        var services = new ServiceCollection();

        services
            .AddDataAccess(builder =>
            {
                builder.AddConnectionString("EventStore", "Microsoft.Data.SqlClient",
                    "Server=.;Database=RecallQuickstart;User id=sa;Password=Pass!000;TrustServerCertificate=true;");
            })
            .AddSqlEventStorage(builder =>
            {
                builder.Options.ConnectionStringName = "EventStore";
            })
            .AddEventStore();

        var serviceProvider = services.BuildServiceProvider();

        // Used to configure the application's services.
        // Will not be required in a hosted environment.
        foreach (var hostedService in serviceProvider.GetServices<IHostedService>())
        {
            await hostedService.StartAsync(CancellationToken.None);
        }

        var store = serviceProvider.GetRequiredService<IEventStore>();

        var id = Guid.NewGuid();

        // we can very easily also add unit tests for our aggregate in a separate project... done here as an example
        var aggregateRoot1 = new AggregateRoot(id);
        var stream1 = (await store.GetAsync(id))
            .Add(aggregateRoot1.Rename("Name-1"))
            .Add(aggregateRoot1.Rename("Name-2"))
            .Add(aggregateRoot1.Rename("Name-3"))
            .Add(aggregateRoot1.Rename("Name-4"))
            .Add(aggregateRoot1.Rename("Name-5"));

        if (aggregateRoot1.AllNames.Count != 5)
        {
            throw new ApplicationException();
        }

        if (!aggregateRoot1.Name.Equals("Name-5"))
        {
            throw new ApplicationException();
        }

        await store.SaveAsync(stream1);

        var aggregateRoot2 = new AggregateRoot(id);

        (await store.GetAsync(id)).Apply(aggregateRoot2);

        if (aggregateRoot2.AllNames.Count != 5)
        {
            throw new ApplicationException();
        }

        if (!aggregateRoot2.Name.Equals("Name-5"))
        {
            throw new ApplicationException();
        }

        foreach (var name in aggregateRoot2.AllNames)
        {
            Console.WriteLine($"[{aggregateRoot2.Id}] : name = '{name}'");
        }

        foreach (var hostedService in serviceProvider.GetServices<IHostedService>())
        {
            await hostedService.StopAsync(CancellationToken.None);
        }
    }
}
```

Once you have executed the program you'll find the 5 relevant entries in the `EventStore` table in the database.