# Message Sender

The purpose of the `IMessageSender` is to abstract sending and publishing capabilities.  The `MessageSender` class provides the actual implementation and both the `ServiceBus` and `HandlerContext` classes hold a reference to a `MessageSender`.

## Methods

### Dispatch

``` c#
Task DispatchAsync(TransportMessage transportMessage, TransportMessage? transportMessageReceived = null);
```

This method invokes the `DispatchTransportMessagePipeline` to have the given `TransportMessage` enqueued on the target queue as specified by the `RecipientInboxWorkQueueUri` of the `TransportMessage`.  If this `Dispatch` takes place in response to the processing of received `TransportMessage` then the `transportMessageReceived` should be the received message; else it is `null`.

### Send

``` c#
Task<TransportMessage> SendAsync(object message, TransportMessage? transportMessageReceived = null, Action<TransportMessageBuilder>? builder = null);
```

Creates and then dispatches a `TransportMessage` using the message routing as configured.  The newly instantiated `TransportMessage` is returned.  The same `transportMessageReceived` processing applies as to the `Dispatch`.  The `builder` allows you to customize the newly created `TransportMessage`.

### Publish

``` c#
Task<IEnumerable<TransportMessage>> PublishAsync(object message, TransportMessage? transportMessageReceived = null, Action<TransportMessageBuilder>? builder = null);
```

Creates and then dispatches a `TransportMessage` to all URIs returned from the registered `ISubscriptionService`.  The same `transportMessageReceived` processing applies as to the `Dispatch`.  The `builder` allows you to customize each newly created `TransportMessage`.

All the instantiated `TransportMessage` instances are returned, with one message for each of relevant `RecipientInboxWorkQueueUri` endpoints that was subscribed to.
