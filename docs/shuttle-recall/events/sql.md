# Sql

```
PM> Install-Package Shuttle.Recall.Sql.Storage
```

A Sql implementation of the `Shuttle.Recall` event sourcing `EventStore`.

## Configuration

This package makes use of the [Data Access components](/shuttle-core/shuttle-core-data), which would also need to be registered.

```c#
DbProviderFactories.RegisterFactory("Microsoft.Data.SqlClient", SqlClientFactory.Instance);

services
    .AddDataAccess(builder =>
    {
        // will get the connection string with name 'EventStore'
        builder.AddConnectionString("EventStore", "Microsoft.Data.SqlClient");
    })
    .AddSqlEventStorage(builder => 
    {
        builder.Options.ConnectionStringName = "EventStore";

        // defaults
        builder.Options.Schema = "dbo";
        builder.Options.ConfigureDatabase = true;
        builder.Options.UncommittedTolerance = TimeSpan.FromSeconds(15);

        builder.UseSqlServer();
    });
```

## Database

The package contains an implementation of an `IHostedService` called `EventStoreHostedService` which will create the required database structures if `ConfigureDatabase` is set to `true` (which is the default).

## Supported providers

- `Microsoft.Data.SqlClient`

If you'd like support for another SQL-based provider you are welcome to create an issue and assistance will be provided where possible; else a pull request would be appreciated.

## IdKeyRepository

You are bound to run into situations where you have a business or other key that is required to be unique.  Given that the `IEventStore` makes use of only surrogate keys the `IdKeyRepository` is used to create a unique list of keys associated with a given aggregate identifier.

Since the keys used in the associated `IdKey` table have to be unique, you should ensure that they contain enough information to be unique and have the intended meaning.

A key could be something such as `[order-number]:ord-001/2016`, `[customer-onboarding]:id-number=0000005555089`, or `[system-name/profile]:672cda1c-c3ec-4f81-a577-e64f9f14e141`.

### Contains

``` c#
ValueTask<bool> ContainsAsync(string key, CancellationToken cancellationToken = default);
```

Returns `true` if the given `key` has an associated aggregate identifier.

---
``` c#
ValueTask<bool> ContainsAsync(Guid id, CancellationToken cancellationToken = default);
```

Returns `true` if the given `id` is present in the key store.

---
### Find

``` c#
ValueTask<Guid?> FindAsync(string key, CancellationToken cancellationToken = default);
```

Returns the `Guid` associated with the given key; else `null`.

---
### Remove

``` c#
Task RemoveAsync(string key, CancellationToken cancellationToken = default);
Task RemoveAsync(Guid id, CancellationToken cancellationToken = default);
```

When specifying the `key` the assocation with the identifier will be removed.  When specifying the `id` all keys associated with the given `id` will be removed.

---
### Add

``` c#
Task AddAsync(Guid id, string key, CancellationToken cancellationToken = default);
```

Creates an association between the `id` and the `key`.

---
### Add

``` c#
Task RekeyAsync(string key, string rekey, CancellationToken cancellationToken = default);
```

Changes `key` to a new key specified by `rekey`.

