# Upgrade to v21.0.0

In general, all major components in the Shuttle space have a `semver` version number starting at `21.0.0`.

## Breaking Changes

Please note that there are quite a few breaking changes.

## Shuttle.Core

> **Note**: All `Shuttle.Core.*` packages have been renamed to `Shuttle.*` (dropped the `Core`).

### Shuttle.Contract

- Throwing `ArgumentNullException` instead of `NullReferenceException` for `AgainstNull` and `AgainstNullOrEmptyString`.

### Shuttle.Data

> **Note**: This package has been deprecated.

### Shuttle.Mediator

- All participants now registered as `Scoped` by default.

### Shuttle.Pipelines

- The `CancellationToken` has been removed from `IPipelineContext` and been added to `IPipelineObserver<T>.ExecuteAsync(IPipelineContext<T> pipelineContext, CancellationToken cancellation = default)`.

## Shuttle.Esb -> Shuttle.Hopper

> **Note**: `Shuttle.Esb` has been deprecated and `Shuttle.Hopper` now contains service bus functionality.

**BREAKING**: The `TransportMessage` has breaking changes but any messages sent from `Shuttle.Esb` may still be processed by a `Shuttle.Hopper` endpoint.  However, messages sent from a `Shuttle.Hopper` endpoint will fail if processed by a `Shuttle.Esb` endpoint.  Please upgrade all related endpoints together.

### Packages

The following packages have been renamed to align with `Shuttle.Hopper` and using `SqlServer` instead of `Sql`:

- `Shuttle.Esb` -> `Shuttle.Hopper`
- `Shuttle.Esb.AmazonSqs` -> `Shuttle.Hopper.AmazonSqs`
- `Shuttle.Esb.AzureEventHubs` -> `Shuttle.Hopper.AzureEventHubs`
- `Shuttle.Esb.AzureStorageQueues` -> `Shuttle.Hopper.AzureStorageQueues`
- `Shuttle.Esb.Kafka` -> `Shuttle.Hopper.Kafka`
- `Shuttle.Esb.RabbitMQ` -> `Shuttle.Hopper.RabbitMQ`
- `Shuttle.Esb.Sql.Queue` -> `Shuttle.Hopper.SqlServer.Queue`
- `Shuttle.Esb.Sql.Subscription` -> `Shuttle.Hopper.SqlServer.Subscription`

Any other `Shuttle.Esb.*` packages present in v20 are not currently available in this release.

### Package Registration Convention

Previously, service bus functionality and transports were configured directly on the `IServiceCollection` instance:

```c#
services.AddServiceBus(builder => { /* ... */ });
services.AddAmazonSqs(builder => { /* ... */ });
services.AddRabbitMQ(builder => { /* ... */ });
```

In `Shuttle.Hopper`, configuration has been consolidated into a fluent builder API. You first call `AddHopper` on the `IServiceCollection`, and then chain transport and feature configurations using the `.Use[Component]()` pattern:

```c#
services.AddHopper(options => 
    {
        // Configure HopperOptions here
    })
    .UseAmazonSqs(builder => { /* ... */ })
    .UseRabbitMQ(builder => { /* ... */ });
```

### Transport Configuration Options

Across all transports, the approach to customizing the underlying provider has changed. Previously, many options classes exposed `event EventHandler` properties (e.g., `Configure`, `ConfigureConsumer`, `ConfigureBlobStorage`) to hook into or override provider-specific settings.

These events have been removed and replaced with direct properties on the respective options classes to supply the configuration or builders natively.

- **AmazonSqs**: Removed the `Configure` event and the `ServiceUrl` property. Added `AWSCredentials AwsCredentials` and `AmazonSQSConfig AmazonSqsConfig` properties.
- **AzureStorageQueues**: Removed the `Configure` event. Added a `QueueClientOptions QueueClient` property.
- **AzureEventHubs**: Removed `ConfigureBlobStorage`, `ConfigureProcessor`, and `ConfigureProducer` events. Replaced by `BlobClientOptions BlobClient`, `EventProcessorClientOptions ProcessorClient`, and `EventHubProducerClientOptions ProducerClient` properties. The `ProcessError` event is now an `AsyncEvent<EventHubProcessErrorEventArgs>` property.
- **Kafka**: Removed `BuildConsumer`, `BuildProducer`, `ConfigureConsumer`, and `ConfigureProducer` events. Replaced by direct `ConsumerBuilder`, `ProducerBuilder`, `ConsumerConfig`, and `ProducerConfig` properties.
- **RabbitMQ**: Removed the `Configure` event. Added a `ConnectionFactory ConnectionFactory` property.

### Inbox options

- `WorkQueueUri` renamed to `WorkTransportUri`.
- `DeferredQueueUri` renamed to `DeferredTransportUri`.
- `ErrorQueueUri` renamed to `ErrorTransportUri`.
- `DurationToIgnoreOnFailure` renamed to `IgnoreOnFailureDurations`.

### TransportMessage

- `DateTime ExpiryDate` changed to `DateTimeOffset ExpiresAt`.
- `DateTime IgnoreTillDate` changed to `DateTimeOffset IgnoreUntil`.
- `DateTime SendDate` changed to `DateTimeOffset SentAt`.

### TransportMessageBuilder

- `Local()` renamed to `ToSelf()`.
- `Defer()` renamed to `DeferUntil(DateTimeOffset)` and `DeferFor(TimeSpan)`.
- `WillExpire()` renamed to `ExpiresAt(DateTimeOffset)` and `ExpiresIn(TimeSpan)`.

### Shuttle.Esb.Sql.Subscription (now Shuttle.Hopper.SqlServer.Subscription)

Previously the SQL subscription service was registered like this:

```c#
services
    .AddSqlSubscription()
    .AddServiceBus(builder =>
    {
        builder.Options.Subscription.ConnectionStringName = "ProcessManagement";
    });
```

It now needs to be registered via the `AddHopper` builder like this:

```c#
services
    .AddHopper(options => 
    {
        // configure hopper options
    })
    .UseSqlServerSubscription(options =>
    {
        options.ConnectionString = "Data Source=...";
        options.Schema = "dbo"; // Optional.  Defaults to `dbo`
    });
```

## Shuttle.Recall

### Packages

The following packages have been renamed to use `SqlServer` instead of `Sql`:

- `Shuttle.Recall.Sql.EventProcessing` -> `Shuttle.Recall.SqlServer.EventProcessing`
- `Shuttle.Recall.Sql.Storage` -> `Shuttle.Recall.SqlServer.Storage`

### Changes

- Renamed `IAsyncEventHandler` to `IEventHandler`.
- Removed `EventStore.CreateEventStream`.  Using `EventStore.GetAsync` will return an empty event stream if none exists.
- Renamed `EventStream.AddEvent` to `EventStream.Add`.
- Removed snapshots as such funcationality should be modelled explicity, for instance using the [Closing the Books pattern](https://event-driven.io/en/closing_the_books_in_practice/).
