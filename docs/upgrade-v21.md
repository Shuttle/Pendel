# Upgrade to v21.0.0

In general, all major components in the Shuttle space have a `semver` version number starting at `21.0.0`.

## Breaking Changes

Please note that there are quite a few breaking changes.

## Shuttle

### Shuttle.Contract

- Throwing `ArgumentNullException` instead of `NullReferenceException` for `AgainstNull` and `AgainstNullOrEmptyString`.

### Shuttle.Data

> **Note**: This package has been deprecated.

### Shuttle.Mediator

- All participants now registered as `Scoped` by default.

### Shuttle.Pipelines

- The `CancellationToken` has been removed from `IPipelineContext` and been added to `IPipelineObserver<T>.ExecuteAsync(IPipelineContext<T> pipelineContext, CancellationToken cancellation = default)`.

### Shuttle.Reflection

-

## Shuttle.Esb -> Shuttle.Hopper

> **Note**: `Shuttle.Esb` has been deprecated and `Shuttle.Hopper` now contains service bus functionality.

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

### Shuttle.Esb.Sql.Subscription

Previuosly the SQL subscription service was registered like this:

```c#
services
    .AddSqlSubscription()
    .AddServiceBus(builder =>
    {
        builder.Options.Subscription.ConnectionStringName = "ProcessManagement";
    });
```

It now needs to be registered like this:

```c#
services
    .AddSqlSubscription(builder =>
    {
        builder.Options.ConnectionStringName = "Subscription";
        builder.Options.Schema = "dbo"; // Optional.  Defaults to `dbo`

        builder.UseSqlServer();
    })
```

## Shuttle.Recall

- Renamed `IAsyncEventHandler` to `IEventHandler`.
- Removed `EventStore.CreateEventStream`.  Using `EventStore.GetAsync` will return an empty event stream if none exists.
- Renamed `EventStream.AddEvent` to `EventStream.Add`.
- Removed snapshots as such funcationality should be modelled explicity, for instance using the [Closing the Books pattern](https://event-driven.io/en/closing_the_books_in_practice/).
