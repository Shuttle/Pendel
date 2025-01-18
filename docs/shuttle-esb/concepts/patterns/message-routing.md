# Message Routing

Once you have instantiated a message you need to get it to a specific endpoint.  You can let Shuttle.Esb decide this for you implicitly by configuring a routing mechanism or you can even specify the endpoint explicitly.

Message routing only when sending any message.  In most cases a message would be a "command", but any message can be sent.  Messages are sent by calling the `SendAsync` method on the service bus instance:

```c#
Task<TransportMessage> SendAsync(object message, Action<TransportMessageBuilder>? builder = null);
```

Only messages that have no `RecipientInboxWorkQueueUri` set will be routed by the service bus; else the message will be sent to the `RecipientInboxWorkQueueUri`, e.g.:

```c#
await serviceBus.SendAsync(new RegisterMember
{
    UserName = userName
}, 
    builder =>
    {
        builder.WithRecipient("scheme://host/queue");
    });
```

The `TransportMessage` envelope will be returned should you need access to any of the metadata available for the message.

Shuttle.Esb uses an implementation of an `IMessageRouteProvider` to determine where messages are sent.

```c#
public interface IMessageRouteProvider
{
    IEnumerable<IMessageRoute> MessageRoutes { get; }
    Task AddAsync(IMessageRoute messageRoute);
    Task<IEnumerable<string>> GetRouteUrisAsync(string messageType);
}
```

## Implementation

The `MessageRouteProvider` is registered if no `IMessageRouteProvider` has been registered and makes use of the [message routing options](/shuttle-esb/options/message-routes) to determine where to send messages:

Each implementation of `IMessageRouteProvider` can determine the routes however it needs to, from the given message type.  A typical scenario, and the way the `MessageRouteProvider` works, is to use the full type name to determine the destination.

**Please note**: each message type may only be sent to _one_ endpoint using `SendAsync`.
