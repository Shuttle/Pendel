# Shuttle.Core.System

```
PM> Install-Package Shuttle.Core.System
```

OS and system level abstractions.

## ISystemClock

The default implementation is `SystemClock`.

``` c#
DateTimeOffset UtcNow { get; }
```

Return the `DataTimeOffset` as the current UTC data/time.

## IEnvironmentService

The default implementation is `EnvironmentService`.

``` c#
bool UserInteractive { get; }
```

Return `true` if running as a console application; else `false`.

## IProcessService

The default implementation is `ProcessService`.

``` c#
IProcess GetCurrentProcess();
```

 Returns the `IProcess` abstraction for the current process.

## IProcess

Represents a system process and the default implementation is `SystemProcess`.

``` c#
void Kill();
```

Kills the process.