# Configuration

This page covers how `Shuttle.Pigeon.Server` and `Shuttle.Pigeon.WebApi` select their queue transport. See the
[Docker](/shuttle-pigeon/docker) and [Docker Compose](/shuttle-pigeon/docker-compose) guides for full, runnable
`server-appsettings.json`/`webapi-appsettings.json` examples.

## Transports

`Shuttle.Pigeon.Server` and `Shuttle.Pigeon.WebApi` register a Hopper transport for each transport configuration
section that is present (via `Shuttle.Pigeon.Hosting`'s `UseConfiguredTransports`). The transport used for a queue is
selected by the scheme of its URI, and the URI host selects the named transport (the child key of the section):

| Transport | Section | URI |
| --- | --- | --- |
| Azure Storage Queues | `Shuttle:Hopper:AzureStorageQueues:{name}` | `azuresq://{name}/{queue}` |
| RabbitMQ | `Shuttle:Hopper:RabbitMQ:{name}` | `rabbitmq://{name}/{queue}` |

At least one transport section is required. For Azure Storage Queues, when neither `StorageAccount` nor
`ConnectionString` is set, the connection string named `{name}` is used — this is how the
[Docker](/shuttle-pigeon/docker) and [Docker Compose](/shuttle-pigeon/docker-compose) examples configure Azurite via
`ConnectionStrings:azure`.

Example using RabbitMQ instead of the default Azure Storage Queues:

```json
{
  "Shuttle": {
    "Hopper": {
      "RabbitMQ": {
        "local": {
          "Host": "localhost",
          "Username": "shuttle",
          "Password": "shuttle!"
        }
      },
      "Inbox": {
        "WorkTransportUri": "rabbitmq://local/pigeon-server-work",
        "DeferredTransportUri": "rabbitmq://local/pigeon-server-deferred",
        "ErrorTransportUri": "rabbitmq://local/pigeon-server-error"
      }
    }
  }
}
```

The web API's `MessageRoutes` URI must point at the same transport as the server's work queue.
