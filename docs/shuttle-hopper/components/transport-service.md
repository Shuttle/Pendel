# Transport Service

An implementation of the `ITransportService` interface is used to manage the transports used in Shuttle.Hopper.

The transport service should not be swapped out for your own implementation as it is integral to the functioning of Shuttle.Hopper and the default implementation should suffice.

## Methods

### FindAsync

``` c#
Task<ITransport?> FindAsync(Uri uri, CancellationToken cancellationToken = default);
```

Returns an `ITransport` implementation that interacts with the transport mechanism represented by the `scheme` in the uri if it has been created; else `null`.

### GetAsync

``` c#
Task<ITransport> GetAsync(Uri uri, CancellationToken cancellationToken = default);
```

This method returns an `ITransport` implementation that interacts with the transport mechanism represented by the `scheme` in the uri.  This method will attempt to return a cached `ITransport` instance.  If none is found a new instance is requested using the `ITransportFactoryService.GetAsync()` method.

Should the uri scheme be `resolver` this method will invoke the configured `IUriResolver` to obtain the represented transport uri and wrap that as a `ResolvedTransport`.

### ContainsAsync

``` c#
ValueTask<bool> ContainsAsync(Uri uri, CancellationToken cancellationToken = default);
```

This method determines whether the transport service has a transport registered for the given URI.

