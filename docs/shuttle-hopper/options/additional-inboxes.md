# Additional Inbox Options

An endpoint may process one or more additional inbox work transports next to its primary [inbox](./inbox.md), without an extra deployment.  Each additional inbox is registered by name using `AddInbox` and gets its own dedicated processor threads and idle back-off, so a busy transport does not starve another.  There is no precedence between the transports.

```c#
var configuration = 
    new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();

services
    .AddHopper(options => 
    {
        configuration
            .GetSection(HopperOptions.SectionName)
            .Bind(options);
    })
    .AddInbox("priority");
```

The options may also be set in code, with or without a configuration entry:

```c#
services
    .AddHopper(options => { ... })
    .AddInbox("priority", options =>
    {
        options.WorkTransportUri = new Uri("azuresq://azure/my-server-work-priority");
        options.ThreadCount = 2;
    });
```

The JSON settings structure is as follows:

```json
{
  "Shuttle": {
    "Hopper": {
      "Inbox": {
        "WorkTransportUri": "azuresq://azure/my-server-work",
        "DeferredTransportUri": "azuresq://azure/my-server-deferred",
        "ErrorTransportUri": "azuresq://azure/shuttle-error"
      },
      "AdditionalInboxes": {
        "priority": {
          "WorkTransportUri": "azuresq://azure/my-server-work-priority",
          "ThreadCount": 2
        }
      }
    }
  }
}
```

## Options

Each entry in `AdditionalInboxes` is an `InboxOptions` instance and therefore has the same [options](./inbox.md#options) as the primary inbox, with the following differences:

| Option | Description |
| --- | --- |
| `WorkTransportUri` | Required.  May not be any other transport uri used by the endpoint (the primary inbox's work, deferred and error transports, the outbox's transports, or another additional inbox's work, deferred or error transport). |
| `ErrorTransportUri` | Optional; when it is not set the primary inbox's error transport is used. |
| `DeferredTransportUri` | Optional; when it is not set deferred messages are parked on the primary inbox's deferred transport.  When it is set the additional inbox gets its own `DeferredMessageProcessor` thread, and an error transport (its own or that of the primary inbox) is required.  The same uniqueness rule as for `WorkTransportUri` applies. |
| `DeferredMessageProcessorResetInterval` | Only used when the additional inbox has its own `DeferredTransportUri`. |
| `DeferredMessageProcessorIdleDuration` | Only used when the additional inbox has its own `DeferredTransportUri`. |

`ThreadCount`, `MaximumFailureCount`, `IdleDurations` and `IgnoreOnFailureDurations` behave as they do for the primary inbox.

## Rules

- The primary `Inbox.WorkTransportUri` is required whenever additional inboxes exist.
- The primary inbox does not need a deferred transport when an additional inbox has its own.
- Inbox names are case-insensitive.
- An `AdditionalInboxes` entry that has not been registered using `AddInbox` causes the bus to fail on start.
- Registering the same name more than once using `AddInbox` throws an `InvalidOperationException`.

## Sending to an additional inbox

A message may be sent to an additional inbox of the sending endpoint by name using the [`ToInbox`](../components/transport-message-builder.md#toinbox) method of the `TransportMessageBuilder`:

```c#
await bus.SendAsync(new ProcessOrder(), builder => builder.ToInbox("priority"));
```

The following semantics apply:

- `ToInbox` sets the message's `RecipientInboxWorkTransportUri` to the additional inbox's work transport uri.  It may not be combined with `ToSelf`, `AsReply` or `WithRecipient`, and sending to a name that has not been configured throws an `InvalidOperationException`.
- `SenderInboxWorkTransportUri` and `ToSelf()` use the primary inbox, which remains the endpoint's identity.  Replies to messages taken from an additional inbox therefore arrive on the primary inbox, and a handler that sends a message using `ToSelf()` sends it to the primary inbox.
- Subscriptions and published events target the primary inbox only.  Additional inboxes are intended for direct sends using `ToInbox`, `WithRecipient` or [message routes](./message-routes.md).

## Deferred messages

A deferred message (including a failed message that is retried after an ignore duration) that is parked on the primary inbox's deferred transport is returned to the additional inbox whose work transport uri matches the message's `RecipientInboxWorkTransportUri`; any other message is returned to the primary inbox.

The match is on the work transport's `Uri`, which a transport may normalise (for instance by replacing a `.` host with the machine name), so a recipient written in another form (or, for a `resolver://` inbox, using the resolved uri) does not match, and the path is case-sensitive.  `ToInbox` always produces a matching recipient.  A message placed on an additional inbox transport with a different or empty recipient moves to the primary inbox after its first deferral.

An additional inbox with its own deferred transport always receives its deferred messages back.

## Threading

Additional inbox thread pools use the service key `InboxProcessor:{name}`, and an additional inbox's own deferred message processor uses `DeferredMessageProcessor:{name}`, with the name lower-cased; these are visible in the `ThreadingOptions` events.
