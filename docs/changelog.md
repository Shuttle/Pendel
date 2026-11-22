# Change log

Notable changes across the Shuttle packages, newest first. For the move to `v21`, see the [upgrade guide](/upgrade-v21).

## 2026-11 — Hopper implementation options moved under `Shuttle:Hopper`

**BREAKING**: The configuration sections for all `Shuttle.Hopper` transport and subscription implementations have moved from `Shuttle:{Implementation}` to `Shuttle:Hopper:{Implementation}`. This places them alongside the core `Shuttle:Hopper` options, so all service bus configuration now lives in a single section.

Applies to the following packages from version `22.1.2`:

| Package | Previous section | New section |
| --- | --- | --- |
| `Shuttle.Hopper.AmazonSqs` | `Shuttle:AmazonSqs` | `Shuttle:Hopper:AmazonSqs` |
| `Shuttle.Hopper.AzureEventHubs` | `Shuttle:AzureEventHubs` | `Shuttle:Hopper:AzureEventHubs` |
| `Shuttle.Hopper.AzureStorageQueues` | `Shuttle:AzureStorageQueues` | `Shuttle:Hopper:AzureStorageQueues` |
| `Shuttle.Hopper.Kafka` | `Shuttle:Kafka` | `Shuttle:Hopper:Kafka` |
| `Shuttle.Hopper.RabbitMQ` | `Shuttle:RabbitMQ` | `Shuttle:Hopper:RabbitMQ` |
| `Shuttle.Hopper.SqlServer.Queue` | `Shuttle:SqlServerQueue` | `Shuttle:Hopper:SqlServerQueue` |
| `Shuttle.Hopper.SqlServer.Subscription` | `Shuttle:SqlServer:Subscription` | `Shuttle:Hopper:SqlServer:Subscription` |

### Upgrading

Move each implementation section into the `Hopper` section of your configuration. For example, the following `appsettings.json`:

```json
{
  "Shuttle": {
    "Hopper": {
      "Inbox": {
        "WorkTransportUri": "rabbitmq://local/inbox-work"
      }
    },
    "RabbitMQ": {
      "local": {
        "Host": "127.0.0.1"
      }
    }
  }
}
```

becomes:

```json
{
  "Shuttle": {
    "Hopper": {
      "Inbox": {
        "WorkTransportUri": "rabbitmq://local/inbox-work"
      },
      "RabbitMQ": {
        "local": {
          "Host": "127.0.0.1"
        }
      }
    }
  }
}
```

The same applies to environment variables and any other configuration provider, e.g. `Shuttle__RabbitMQ__local__Host` becomes `Shuttle__Hopper__RabbitMQ__local__Host`.

Code that binds options using the `SectionName` constant (e.g. `RabbitMQOptions.SectionName`) picks up the new path automatically. Options configured in code through the builder (e.g. `UseRabbitMQ(builder => ...)`) are not affected.

::: warning
A section left at the old path is no longer read and no error is raised for it. The named options referenced by the transport URI (e.g. `local` in `rabbitmq://local/...`) will then contain only default values, so connections typically fail at runtime.
:::
