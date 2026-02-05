# Shuttle.Core.TransactionScope

This package makes use of the .Net `TransactionScope` class to provide ambient transaction handling.

## Installation

```bash
dotnet add package Shuttle.Core.TransactionScope
```

## Configuration

The relevant components may be configured using `IServiceCollection`:

```c#
services.AddTransactionScope(builder => 
{
    builder.Configure(options =>
    {
        options.Enabled = true;
        options.IsolationLevel = IsolationLevel.ReadCommitted;
        options.Timeout = TimeSpan.FromSeconds(30);
    });
});
```

### Default Values

- `Enabled`: `true`
- `IsolationLevel`: `IsolationLevel.ReadCommitted`
- `Timeout`: `TimeSpan.FromSeconds(30)`

### JSON Configuration

The default JSON settings structure is as follows:

```json
{
	"Shuttle": {
		"TransactionScope": {
			"Enabled": true,
			"IsolationLevel": "ReadCommitted",
			"Timeout": "00:00:30"
		} 
	}
}
```

## ITransactionScope

An implementation of the `ITransactionScope` interface is used to wrap a `TransactionScope`. The interface implements `IDisposable` for proper resource management.

The `DefaultTransactionScope` makes use of the standard .NET `TransactionScope` functionality. There is also a `NullTransactionScope`, which is used when the transaction scope handling is disabled, that implements the null pattern so it implements the interface but does not do anything.

### Properties

``` c#
Guid Id { get; }
```

Returns the Id of the transaction scope.

- `DefaultTransactionScope`: Returns a new `Guid` for each instance
- `NullTransactionScope`: Returns `Guid.Empty`

### Methods

``` c#
void Complete();
```

Marks the transaction scope as complete. If `Complete()` is not called before disposal, the transaction will be rolled back.

``` c#
void Dispose();
```

Disposes the transaction scope. Should be called using a `using` statement or block.

## ITransactionScopeFactory

An implementation of the `ITransactionScopeFactory` interface provides instances of an `ITransactionScope` implementation. The factory is registered as a singleton service.

The `TransactionScopeFactory` provides a `DefaultTransactionScope` instance if transaction scopes are `Enabled`; else a `NullTransactionScope` that implements the null pattern.

### Methods

``` c#
ITransactionScope Create();
```

Creates a transaction scope using the default configuration values from `TransactionScopeOptions`.

``` c#
ITransactionScope Create(IsolationLevel isolationLevel, TimeSpan timeout);
```

Creates a transaction scope using the specified isolation level and timeout.

## Usage

```c#
public class MyService
{
    private readonly ITransactionScopeFactory _transactionScopeFactory;

    public MyService(ITransactionScopeFactory transactionScopeFactory)
    {
        _transactionScopeFactory = transactionScopeFactory;
    }

    public void PerformDatabaseOperation()
    {
        // Using default configuration
        using (var scope = _transactionScopeFactory.Create())
        {
            // Perform database operations
            
            scope.Complete(); // Commit the transaction
        } // Transaction is rolled back if Complete() was not called
    }

    public void PerformCustomOperation()
    {
        // Using custom isolation level and timeout
        using (var scope = _transactionScopeFactory.Create(
            IsolationLevel.Serializable, 
            TimeSpan.FromMinutes(5)))
        {
            // Perform database operations
            
            scope.Complete();
        }
    }
}
```

## Behavior

### Async Flow

The `DefaultTransactionScope` is configured with `TransactionScopeAsyncFlowOption.Enabled`, allowing the transaction to flow across async/await boundaries.

### Nested Transactions

The implementation uses `TransactionScopeOption.RequiresNew`, which always creates a new transaction scope. If a transaction is already active when creating a new scope, the new scope will ignore the outer transaction to prevent nesting issues.

### Transaction Rollback

If `Complete()` is not called before the scope is disposed, the transaction will automatically roll back. This ensures that incomplete operations do not commit partial changes.
