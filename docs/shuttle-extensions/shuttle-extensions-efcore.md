# Shuttle.Extensions.EFCore

```
PM> Shuttle.Extensions.EFCore
```

Extensions for Entity Framework Core.

## Configuration

```c#
services.AddSingleton<IDbContextService, DbContextService>();
```

## Usage

The `DbContextService` is a simple service that provides a `DbContext` instance.  This is useful when you need a `DbContext` instance in multiple dependencies without having to use the `DbContextFactory` in each.

```c#
private readonly IDbContextFactory<RequiredDbContext> _dbContextFactory;
private readonly IDbContextService _dbContextService;
private readonly IDependencyA _dependencyA;
private readonly IDependencyB _dependencyB;

public Processor(IDbContextService dbContextService, IDbContextFactory<RequiredDbContext> dbContextFactory, IDependencyA dependencyA, IDependencyB dependencyB)
{
    _dbContextService = Guard.AgainstNull(dbContextService);
    _dbContextFactory = Guard.AgainstNull(dbContextFactory);
    _dependencyA = Guard.AgainstNull(dependencyA);
    _dependencyB = Guard.AgainstNull(dependencyB);
}

public async Task ExecuteAsync(CancellationToken cancellationToken = default)
{
    using (var tx = new TransactionScope(TransactionScopeOption.Required, TransactionScopeAsyncFlowOption.Enabled))
    await using (var dbContext = await _dbContextFactory.CreateDbContextAsync(cancellationToken))
    using (_dbContextService.Add(dbContext))
    {
        _dependencyA.Process();
        _dependencyB.Process();

        tx.Complete();
    }
}
```

The dependencies `IDependencyA` and `IDependencyB` can now use the `DbContext` instance that was created in the `Processor` class:

```c#
public class DependencyA : IDependencyA
{
    private readonly IDbContextService _dbContextService;
    p
    ublic DependencyA(IDbContextService dbContextService)
    {
        _dbContextService = Guard.AgainstNull(dbContextService);
    }
    
    public void Process()
    {
        var dbContext = _dbContextService.Get<RequiredDbContext>();
        // use the dbContext instance
    }
}
```

There is also a `DbContextScope` that can be used to create a new scope within an asynchronous flow.  Please see the [ScopeFixture](https://github.com/Shuttle/Shuttle.Extensions.EFCore/blob/master/Shuttle.Extensions.EFCore.Tests/ScopeFixture.cs) for more information.

# Shuttle.Extensions.EFCore.ThreadDbContextScope

Used in conjunction with the `Shuttle.Extensions.EFCore` and `Shuttle.Core.Threading` packages to provide a `DbContext` for each thread that is created.

```
PM> Install-Package Shuttle.Extensions.EFCore.ThreadDbContextScope
```

Creates a new `DbContext` for each thread that is created.  This is useful when you have a multi-threaded application that requires a `DbContext` for each thread.

## Configuration

```c#
services.AddThreadDbContextScope();
```
