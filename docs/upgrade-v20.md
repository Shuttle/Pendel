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

### Shuttle.Core.Reflection

- Removed `IReflectionService.AssemblyPath`.
- Removed `IReflectionService.FindAssemblyNamedAsync`.
- Removed `IReflectionService.GetAssemblyAsync`.
- Removed `IReflectionService.GetTypesAsync`.
- Renamed `IReflectionService.GetTypesAssignableToAsync` to `IReflectionService.GetTypesCastableToAsync`.

## Shuttle.Esb

- The `IAsyncMessageHandler` has changed to only `IMessageHandler`.
- 

## Shuttle.Recall