# Upgrade to v20.0.0

All major components in the Shuttle space have a `semver` version number starting at `20.0.0` and all synchronous methods have been removed where an asynchronous method is available.  The approach is now `async` first.

Also, only the lastest LTS version of `dotnet` will be supported going forward.

## Breaking Changes

Please note that there are quite a few breaking changes.  These will, typically, require minimal rework or "search & replace" to fix but it is still going to take some work.

## Shuttle.Core

### Shuttle.Core.Contract

- Throwing `ArgumentNullException` instead of `NullReferenceException` for `AgainstNull` and `AgainstNullOrEmptyString`.

### Shuttle.Core.Data

- Removed `ScriptProvider` as query factories should rather be used.

### Shuttle.Core.Mediator

- Renamed `IAsyncParticipant` to `IParticipant`.

### Shuttle.Core.Pipelines

- `IPipelineObserver`: changed `Task ExecuteAsync(TPipelineEvent pipelineEvent)` to `Task ExecuteAsync(IPipelineContext<TPipelineEvent> pipelineContext)`.
- Pipeline events no longer need to inherit from `PipelineEvent`; and it has been removed.

### Shuttle.Core.Reflection

- Removed `IReflectionService.AssemblyPath`.
- Removed `IReflectionService.FindAssemblyNamedAsync`.
- Removed `IReflectionService.GetAssemblyAsync`.
- Removed `IReflectionService.GetTypesAsync`.
- Renamed `IReflectionService.GetTypesAssignableToAsync` to `IReflectionService.GetTypesCastableToAsync`.

## Shuttle.Esb

> **Note**: Using `JsonSerializer` as the default.  To use XML call `services.AddSingleton<ISerializer, XmlSerializer>()` before calling `services.AddServiceBus()`.

- Renamed `IAsyncMessageHandler` to `IMessageHandler`.
- `ServiceBusOptions.Asynchronous` as `async` is now the preferred mechanism.
- Removed all idempotence features, such as `IIdempotenceService` and `IdempotenceOptions`, as idempotence should be a module.
- `MessageHandlerInvokeResult` removed in favour of returning `bool` from `IMessageHandlerInvoker.InvokeAsync`.
- `IReusability` removed as handlers are obtained from the `IServiceProvider`.
- `IMessageHandlingAssessor` removed.

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
