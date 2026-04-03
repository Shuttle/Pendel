# Shuttle.Core.System

OS and system level abstractions that provide a way to decouple your logic from static system calls, making your code more testable.

## Why?

When your code calls `DateTimeOffset.UtcNow`, `Environment.UserInteractive`, or `Process.GetCurrentProcess()`, it is difficult to unit test that code because these are static calls to the operating system. By using these abstractions, you can mock the system-level behavior in your tests.

## Installation

```bash
dotnet add package Shuttle.Core.System
```

## Usage

Register the services with your dependency injection container:

```csharp
services.AddSingleton<ISystemClock, SystemClock>();
services.AddSingleton<IEnvironmentService, EnvironmentService>();
services.AddSingleton<IProcessService, ProcessService>();
```

All types are in the `Shuttle.Core.System` namespace.

## `ISystemClock`

The default implementation is `SystemClock`.

```csharp
DateTimeOffset UtcNow { get; }
```

Returns the `DateTimeOffset` representing the current UTC date/time.

## `IEnvironmentService`

The default implementation is `EnvironmentService`.

```csharp
bool UserInteractive { get; }
```

Returns `true` if running as a console application; otherwise `false`.

## `IProcessService`

The default implementation is `ProcessService`.

```csharp
IProcess GetCurrentProcess();
```

Returns an `IProcess` abstraction for the current system process.

## `IProcess`

Represents a system process. The default implementation is `SystemProcess`.

```csharp
void Kill();
```

Kills the process.