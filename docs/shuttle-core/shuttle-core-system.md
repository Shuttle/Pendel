# Shuttle.Core.System

OS and system level abstractions.

## Installation

```bash
dotnet add package Shuttle.Core.System
```

Or via the NuGet Package Manager:

```
PM> Install-Package Shuttle.Core.System
```

All types are in the `Shuttle.Core.System` namespace.

## ISystemClock

The default implementation is `SystemClock`.

``` c#
DateTimeOffset UtcNow { get; }
```

Returns the `DateTimeOffset` representing the current UTC date/time.

## IEnvironmentService

The default implementation is `EnvironmentService`.

``` c#
bool UserInteractive { get; }
```

Returns `true` if running as a console application; otherwise `false`.

## IProcessService

The default implementation is `ProcessService`.

``` c#
IProcess GetCurrentProcess();
```

Returns the `IProcess` abstraction for the current process.

## IProcess

Represents a system process. The default implementation is `SystemProcess`.

``` c#
void Kill();
```

Kills the process.