# Message Sender

The purpose of the `IMessageSender` is to abstract sending and publishing capabilities.  The `MessageSender` class provides the actual implementation and both the `Bus` and `HandlerContext` classes hold a reference to a `MessageSender`.

## Methods

### DispatchAsync

``` c#
Task DispatchAsync(TransportMessage transportMessage, CancellationToken cancellationToken = default);
```

This method invokes the `DispatchTransportMessagePipeline` to have the given `TransportMessage` enqueued on the target transport as specified by the `RecipientInboxWorkTransportUri` of the `TransportMessage`.

### SendAsync

``` c#
Task<TransportMessage> SendAsync(object message, Action<TransportMessageBuilder>? builder = null, CancellationToken cancellationToken = default);
```

Creates and then dispatches a `TransportMessage` using the message routing as configured.  The newly instantiated `TransportMessage` is returned.  The `builder` allows you to customize the newly created `TransportMessage`.

### PublishAsync

``` c#
Task<IEnumerable<TransportMessage>> PublishAsync(object message, Action<TransportMessageBuilder>? builder = null, CancellationToken cancellationToken = default);
```

Creates and then dispatches a `TransportMessage` to all URIs returned from the registered `ISubscriptionService`.  The `builder` allows you to customize each newly created `TransportMessage`.

All the instantiated `TransportMessage` instances are returned, with one message for each of relevant `RecipientInboxWorkTransportUri` endpoints that was subscribed to.
