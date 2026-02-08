# Subscription Options

The `SubscriptionOptions` configured as `HopperOptions.Subscription` represent common options related to subscriptions.

Any implementation of the `ISubscriptionService` interface should make use of these options to register, or ensure, any subscriptions:

```c#
services.AddHopper(builder => 
{
    builder.Options.Subscription.Mode = SubscriptionMode.Standard; // default
    
    // add subscription to message types directly; else below options on builder
    builder.Options.Subscription.MessageTypes.Add(typeof(Event1).FullName);

    // using type
    builder.AddSubscription(typeof(Event1));
    builder.AddSubscription(typeof(Event2));

    // using a full type name
    builder.AddSubscription(typeof(Event1).FullName);
    builder.AddSubscription(typeof(Event2).FullName);

    // using a generic
    builder.AddSubscription<Event1>();
    builder.AddSubscription<Event2>();
});
```

And the JSON configuration structure:

```json
{
  "Shuttle": {
    "Hopper": {
      "Subscription": {
        "Mode": "Standard",
        "CacheTimeout": "00:05:00",
        "MessageTypes": [
          "message-type-a",
          "message-type-b"
        ]
      }
    }
  }
}
```

## Options

| Option | Default	| Description | 
| --- | --- | --- |
| `Mode` | `Standard` | Indicates how subscriptions are dealt with: <br/>- `Standard` is the ***default*** and will subscribe to the given message type(s) if they have not been subscribed to yet.<br/>- `FailWhenMissing` will check to see that the subscription exists and if not will throw an exception.<br/>- `Disabled` will simply ignore the subscription request. |
| `CacheTimeout` | `null` | How long event subscribers should be cached for before refreshing the list. |

When moving to a non-development environment it is recommended that you make use of the `FailWhenMissing` option for the `Mode`.
