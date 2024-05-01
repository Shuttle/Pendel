# Projections

Event processing relates to the *Query Responsibility* side of the *Command/Query Responsibility Segregation* pattern.

Since the event sourcing side of things produces a series of events that are chronologically ordered we can process those events one after the other to produce any output structures that are required for reporting, querying, or business intelligence.

Each one of these processing streams is called a **projection**.  Any single projection has to process events in a serial fashion.  This means that the only parallel processing that is possible is to have mutliple projections where each processes a different set of events.

## EventProcessor

An `EventProcessor` instance is used to manage all the projections.  `EventProjection` instances may be added to the `EventProcessor` and each runs on its own thread.  In contrast to normal message processing there is no **poison** queue and no retries.

## Projection

A `Projection` has a name and represents a specific set of output data that you are interested in.  Each projection is a logical queue that has a current position within the event stream.  All event sources messages should have a global sequence number that is used as a *cursor* of sorts.

When you need to rebuild your read model for whatever reason you can simply delete the read model, reset the projection's position back to zero (or delete it), and re-run the projection.

### AddEventHandler

In order to be able to handle any events in your projection you will need to add event handlers using the `AddEventHandler` method using the `EventStoreBuilder`:

```c#
services.AddEventStore(builder =>
{
    builder.AddEventHandler<ProjectionNameHandler>("ProjectionName");
});
```

## IEventHandler

Depending on the value of the `EventStoreOptions.Asynchronous` options, an event handler must implement either the `IAsyncEventHandler` interface for asynchronous support, or `IEventHandler` for synchronous event handling:

```c#
namespace Shuttle.Recall
{
    public interface IEventHandler<in T> where T : class
    {
        void ProcessEvent(IEventHandlerContext<T> context);
    }

    public interface IAsyncEventHandler<in T> where T : class
    {
        Task ProcessEventAsync(IEventHandlerContext<T> context);
    }
}
```

### IEventHandlerContext

The event handler context provides the full `EventEnvelope` and `PrimitiveEvent`, the actual deserialized domain `Event` containing the original data that was added to the `EventStream`, and the `CancellationToken` that you can interrogate to determine if the processing is still active.

## IProjectionRepository

The `IProjectionRepository` interface is implemented by a technology-specific package.  The `Shuttle.Recall.Sql.EventProcessing` package provides a Sql Server based implementation of the `IProjectionRepository`.

### GetSequenceNumber

```c#
long GetSequenceNumber(string name);
ValueTask<long> GetSequenceNumberAsync(string projectionName);
```

Returns the `SequenceNumber` position of the last event that was processed for the projection with the specified `name`.

### SetSequenceNumber

```c#
void SetSequenceNumber(string name, long sequenceNumber);
Task SetSequenceNumberAsync(string projectionName, long sequenceNumber);
```

Sets the `SequenceNumber` position of the projection with the given 'name'.

### Find

```c#
Projection Find(string name);
Task<Projection> FindAsync(string name);
```

Returns the `Projection` for the given `name`.

### Save

```c#
void Save(Projection projection);
Task SaveAsync(Projection projection);
```

Persists the current `projection` data.