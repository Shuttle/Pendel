# Shuttle.Core.Mediator

```
PM> Install-Package Shuttle.Core.Mediator
```

The Shuttle.Core.Mediator package provides a [mediator pattern](https://en.wikipedia.org/wiki/Mediator_pattern) implementation.

## Configuration

In order to get all the relevant bits working you would need to register the `IMediator` dependency along with all the relevant `IParticipant` (for synchronous `Send`), or `IAsyncParticipant` (for asynchronous `SendAsync`), dependencies.

You can register the mediator using `IServiceCollection`:

```c#
services.AddMediator(builder =>
{
    builder.AddParticipants(assembly);
    builder.AddParticipant<Participant>();
    builder.AddParticipant(participantType)
    builder.AddParticipant<Message>(participant)
});
```

## IMediator

The core interface is the `IMediator` interface and the default implementation provided is the `Mediator` class.

This interface provides a synchronous calling mechanism and all participant implementations need to be thread-safe singleton implementations that are added to the mediator at startup.  Any operations that require transient mechanisms should be handled by the relevant participant.

```c#
void Send(object message, CancellationToken cancellationToken = default);
```

The `Send` method will find all participants that implement the `IParticipant<T>` with the type `T` of the message type that you are sending.

```c#
Task SendAsync(object message, CancellationToken cancellationToken = default);
```

The `SendAsync` method will find all participants that implement the `IAsyncParticipant<T>` with the type `T` of the message type that you are sending.

Participants that are marked with the `BeforeParticipantAttribute` filter will be executed first followed by all participants with no filter attributes and then finally all participants marked with the `AfterParticipantAttribute` filter will be called.

## Participants

```c#
public interface IAsyncParticipant<in T>
{
    Task ProcessMessageAsync(IParticipantContext<T> context);
}

public interface IParticipant<in T>
{
    void ProcessMessage(IParticipantContext<T> context);
}
```

A participant would handle the message that is sent using the mediator.  There may be any number of participants that process the message. 

## Design philosophy

There are no *request/response* semantics and the design philosophy here is that the message encapsulates the state that is passed along in a *pipes & filters* approach.

However, you may wish to make use of one of the existing utility classes:-

### RequestMessage\<TRequest\>

The only expectation from a `RequestMessage<TRequest>` instance is either a success or failure (along with the failure message).

### RequestResponseMessage\<TRequest, TResponse\>

The `RequestResponseMessage<TRequest, TResponse>` takes an initial `TRequest` object and after the mediator processing would expect that there be a `TResponse` provided using the `.WithResponse(TResponse)` method.  The same success/failure mechanism used in the `RequestMessage<TRequest>` class is also available on this class.

## Considerations

If you have a rather predictable sequential workflow and you require something faster execution then you may wish to consider the [Shuttle.Core.Pipelines](http://shuttle.github.io/shuttle-core/shuttle-core-pipelines) package.  A performance testing application for your use-case would be able to indicate the more suitable option.
