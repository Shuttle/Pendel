# Shuttle.Specification

Provides a simple implementation of the specification pattern.

## Installation

```bash
dotnet add package Shuttle.Specification
```

## Synchronous Specification

### `ISpecification<T>`

A custom specification can be implemented by inheriting from the `ISpecification<T>` interface:

```c#
public class MySpecification : ISpecification<MyCandidate>
{
    public bool IsSatisfiedBy(MyCandidate candidate)
    {
        return candidate.IsActive && !candidate.IsDeleted;
    }
}
```

### `Specification<T>`

A default `Specification<T>` wrapper class is available that accepts a function as a callback for simple scenarios where an explicit `ISpecification<T>` implementation may not be warranted:

```c#
var specification = new Specification<MyCandidate>(candidate => candidate.IsActive && !candidate.IsDeleted);

if (specification.IsSatisfiedBy(myCandidate))
{
    // ...
}
```

## Asynchronous Specification

### `IAsyncSpecification<T>`

An asynchronous specification can be implemented by inheriting from the `IAsyncSpecification<T>` interface:

```c#
public class MyAsyncSpecification : IAsyncSpecification<MyCandidate>
{
    public async Task<bool> IsSatisfiedByAsync(MyCandidate candidate)
    {
        return await _myService.IsActiveAsync(candidate.Id);
    }
}
```

### `AsyncSpecification<T>`

A default `AsyncSpecification<T>` wrapper class is available that accepts a function as a callback for simple scenarios where an explicit `IAsyncSpecification<T>` implementation may not be warranted:

```c#
var specification = new AsyncSpecification<MyCandidate>(async candidate => await _myService.IsActiveAsync(candidate.Id));

if (await specification.IsSatisfiedByAsync(myCandidate))
{
    // ...
}
```
