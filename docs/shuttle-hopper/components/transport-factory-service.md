# Transport Factory Service

An implementation of the `ITransportFactoryService` interface is used to manage the transport factories used in Shuttle.Hopper.

The transport factory service should not be swapped out for your own implementation as it is integral to the functioning of Shuttle.Hopper and the default implementation should suffice.

## Methods

### Get

``` c#
ITransportFactory Get(string scheme);
```

The method will return an instance of the transport factory registered for the requested `scheme`.

### Find

``` c#
ITransportFactory? Find(string scheme);
```

The method will return an instance of the transport factory registered for the requested `scheme` if it exists; else `null`.

### Register

``` c#
void Register(ITransportFactory transportFactory);
```

Use this method to explicitly register a transport factory instance.

### Contains

``` c#
bool Contains(string scheme);
```

This method determines whether the transport factory service has a transport factory registered for the given scheme.

## Properties

### Factories

``` c#
IEnumerable<ITransportFactory> Factories { get; }
```

Returns the `ITransportFactory` implementations that the transport factory service is aware of.
