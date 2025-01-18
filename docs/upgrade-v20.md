# Upgrade to v20.0.0

All major components in the Shuttle space have a `semver` version number starting at `20.0.0` and all synchronous methods have been removed where an asynchronous method is available.  The approach is now `async` first.

Also, only the lastest LTS version of `dotnet` will be supported going forward.

## Breaking Changes

Please note that there are quite a few breaking changes.  These will, typically, require minimal rework or "search & replace" to fix but it is still going to take some work.

## Shuttle.Core

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

- `ServiceBusOptions.Asynchronous` as `async` is now the preferred mechanism.
- The `IAsyncMessageHandler` has changed to only `IMessageHandler`.
- Removed all idempotence features, such as `IIdempotenceService` and `IdempotenceOptions`, as idempotence should be a module.
- `MessageHandlerInvokeResult` removed in favour of returning `bool` from `IMessageHandlerInvoker.InvokeAsync`.
- `IReusability` removed as handlers are obtained from the `IServiceProvider`.
- `IMessageHandlingAssessor` removed.

## Shuttle.Recall