# Message Handler

In order to handle a message sent to an endpoint you need to implement the `IMessageHandler<>` interface on a class that is typically called the *message handler*.

## Methods

### ProcessMessage

``` c#
Task ProcessMessageAsync(IHandlerContext<T> context);
```

The `<T>` generic argument should be the type of the message class you are interested in.  This method will contain the actual implementation code that reacts to the message that is passed in.  If [Shuttle.Core.Transactions](https://shuttle.github.io/shuttle-core/infrastructure/shuttle-core-transactions.html) are enabled then this method will be wrapped in a `TransactionScope`.
