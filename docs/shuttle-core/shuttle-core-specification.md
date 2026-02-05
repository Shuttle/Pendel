# Shuttle.Core.Specification

## Installation

```bash
dotnet add package Shuttle.Core.Specification
```

Provides a simple `ISpecification` interface.

A default `Specification` class is available that accepts a function as a callback for scenarios where an explicit `ISpecification` implementation may not be warranted:

``` c#
public Specification(Func<T, bool> function)
```

## Asynchronous

The package also provides an `IAsyncSpecification` interface:

``` c#
public interface IAsyncSpecification<in T>
{
    Task<bool> IsSatisfiedByAsync(T candidate);
}
```

A default `AsyncSpecification` class is available that accepts a function as a callback for scenarios where an explicit `IAsyncSpecification` implementation may not be warranted:

``` c#
public AsyncSpecification(Func<T, Task<bool>> function)
```