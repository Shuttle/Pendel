# TransportMessageBuilder

## Properties

### Headers

``` c#
public List<TransportHeader> Headers { get; }
```

Contains the list of name/value pair transport headers.

### HasRecipient

``` c#
public bool HasRecipient { get; }
```

Returns `true` if the transport message has a `RecipientInboxWorkTransportUri`; else `false`.

### ShouldReply

``` c#
public bool ShouldReply { get; }
```

### ShouldSendToSelf

``` c#
public bool ShouldSendToSelf { get; }
```

### InboxName

``` c#
public string? InboxName { get; }
```

The name of the [additional inbox](../options/additional-inboxes.md) of this endpoint that the message should be sent to, if any.

## Methods

### ToSelf

``` c#
public TransportMessageBuilder ToSelf();
```

This sets the `ShouldSendToSelf` flag.  During dispatch the `RecipientInboxWorkTransportUri` will be set to the primary inbox work transport uri.

### ToInbox

``` c#
public TransportMessageBuilder ToInbox(string name);
```

This sets the `InboxName`.  During dispatch the `RecipientInboxWorkTransportUri` will be set to the work transport uri of the [additional inbox](../options/additional-inboxes.md) with the given name.  An `InvalidOperationException` is thrown if no additional inbox with that name has been configured.

`ToSelf`, `ToInbox`, `AsReply` and `WithRecipient` are mutually exclusive.

### AsReply

``` c#
public TransportMessageBuilder AsReply();
```

This sets the `ShouldReply` flag.  During dispatch the `RecipientInboxWorkTransportUri` will be set to the `SenderInboxWorkTransportUri` of the transport message that was received.

### WithRecipient

``` c#
public TransportMessageBuilder WithRecipient(ITransport transport);
public TransportMessageBuilder WithRecipient(Uri uri);
public TransportMessageBuilder WithRecipient(string uri);
```

This sets the `RecipientInboxWorkTransportUri` explicitly and no routing will be applied.

### WithSender

``` c#
public TransportMessageBuilder WithSender(ITransport transport);
public TransportMessageBuilder WithSender(Uri uri);
public TransportMessageBuilder WithSender(string uri);
```

This sets the `SenderInboxWorkTransportUri` explicitly.

### WithCorrelationId

``` c#
public TransportMessageBuilder WithCorrelationId(string correlationId);
```

Sets the correlation id for the message.

### DeferUntil

``` c#
public TransportMessageBuilder DeferUntil(DateTimeOffset ignoreUntil);
```

Ignores the `TransportMessage` until the given date/time has been reached.  

### DeferFor

``` c#
public TransportMessageBuilder DeferFor(TimeSpan delay);
```

Ignores the `TransportMessage` for the given duration.

### ExpiresAt

``` c#
public TransportMessageBuilder ExpiresAt(DateTimeOffset expiresAt);
```

The message will only remain valid until this date is reached.

### ExpiresIn

``` c#
public TransportMessageBuilder ExpiresIn(TimeSpan after);
```

The message will only remain valid for the given duration.

### WithPriority

``` c#
public TransportMessageBuilder WithPriority(int priority);
```
