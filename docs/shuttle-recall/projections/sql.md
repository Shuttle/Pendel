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

## Options

The `SqlEventProcessingOptions` contains the following options:

| Option | Default | Description |
| --- | --- | --- |
| `ConnectionStringName` | `""` | The connecting string name representing the projection store. |
| `Schema` | `dbo` | The schema that the database structure belong to. |
| `ConfigureDatabase` | `true` | If `true` the `EventProcessingHostedService` will create the database structures if they do not exist. |
| `ProjectionJournalSize` | `1000` | The maximum number of events to retrieve as a journal batch. |
| `ProjectionJournalChunkSize` | `500` | The maximum number of sequence numbers to save to the journal in a batch.  Sql Server has a limit. |
| `RegisterDatabaseContextObserver` | `true` | If `true` the `DatabaseContextObserver` will be registered.  This creates ensures that a `DatabaseContext` exists in the `Handle` stage of the `EventProcessingPipeline`. |

## Database

The package contains an implementation of an `IHostedService` called `EventProcessingHostedService` which will create the required database structures if `ConfigureDatabase` is set to `true` (which is the default).

## Supported providers

- `Microsoft.Data.SqlClient`

If you'd like support for another SQL-based provider you are welcome to create an issue and assistance will be provided where possible; else a pull request would be appreciated.
