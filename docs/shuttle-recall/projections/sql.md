# Sql

```
PM> Install-Package Shuttle.Recall.Sql.EventProcessing
```

A Sql implementation of the `Shuttle.Recall` event sourcing mechanism.

## Configuration

This package makes use of the [Data Access components](/shuttle-core/shuttle-core-data), which would also need to be registered.

```c#
DbProviderFactories.RegisterFactory("Microsoft.Data.SqlClient", SqlClientFactory.Instance);

services
    .AddDataAccess(builder =>
    {
        builder.AddConnectionString("projection-connection-string-name", "Microsoft.Data.SqlClient");
        builder.AddConnectionString("event-store-connection-string-name", "Microsoft.Data.SqlClient");
    })
    .AddSqlEventStorage(builder =>
    {
        builder.Options.ConnectionStringName = "event-store-connection-string-name";

        builder.UseSqlServer();
    })
    .AddSqlEventProcessing(builder =>
    {
        builder.Options.ConnectionStringName = "projection-connection-string-name";

        builder.UseSqlServer();
    })
    .AddEventStore(builder =>
    {
        builder.AddProjection("projection-name").AddEventHandler<Handler>();

        builder.Options.ProjectionThreadCount = 1;
    })
```

## Database

The package contains an implementation of an `IHostedService` called `EventProcessingHostedService` which will create the required database structures if `ConfigureDatabase` is set to `true` (which is the default).

## Supported providers

- `Microsoft.Data.SqlClient`

If you'd like support for another SQL-based provider you are welcome to create an issue and assistance will be provided where possible; else a pull request would be appreciated.
