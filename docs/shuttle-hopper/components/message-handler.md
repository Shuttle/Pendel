# Message Handler

In order to handle a message sent to an endpoint you need to implement either the `IMessageHandler<>` or the `IContextMessageHandler<>` interface on a class that is typically called the *message handler*.

## Methods

### HandleAsync (`IMessageHandler<>`)

``` c#
Task HandleAsync(T message, CancellationToken cancellationToken = default);
```

The `<T>` generic argument should be the type of the message class you are interested in.  This method will contain the actual implementation code that reacts to the message that is passed in directly as `message`.

### HandleAsync (`IContextMessageHandler<>`)

``` c#
Task HandleAsync(IHandlerContext<T> context, CancellationToken cancellationToken = default);
```

The `<T>` generic argument should be the type of the message class you are interested in.  This method will contain the actual implementation code that reacts to the message that is passed in.  The message instance is available via the `context.Message` property, and the context also provides `SendAsync`/`PublishAsync` methods for sending further messages.
