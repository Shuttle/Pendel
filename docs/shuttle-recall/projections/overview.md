# Projections

Event processing relates to the *Query Responsibility* side of the *Command/Query Responsibility Segregation* pattern.

Since the event sourcing side of things produces a series of events that are chronologically ordered we can process those events one after the other to produce any output structures that are required for reporting, querying, or business intelligence.

Each one of these processing streams is called a **projection**.  All events for a given `CorrelationId`, or `Id` if `CorrelationId` is `null`, are processed in order using the `SequenceNumber`.

## EventProcessor

An `EventProcessor` instance is used to manage all the projections.  `EventProjection` instances may be added to the `EventProcessor` and each runs on its own thread.  In contrast to normal message processing there is no **poison** queue and no retries.  If processing fails for any reason the process should be terminated.

## Projection

A `Projection` has a name and represents a specific set of output data that you are interested in.  Each projection is a logical queue that has a current position within the event stream.  All event store messages should have a global sequence number that is used as a *cursor* of sorts.

When you need to rebuild your read model for whatever reason you can delete the read model, reset the projection's position back to zero (or delete it), and re-run the projection.  One should be cognizant of the fact that rebuilding a projection may take some time and in certain cases it may be worth the effort to create a separate projection that can later be renamed, once it has been populated.

### AddEventHandler

In order to be able to handle any events in your projection you will need to add event handlers using the `AddEventHandler` method using the `EventStoreBuilder`:

```c#
services.AddEventStore(builder =>
{
    builder.AddProjection("projection-name")
        // event handler type, with optional service lifetime
        .AddEventHandler(Type, Func<Type, ServiceLifetime>? = null) 
        // event handler instance (singleton)
        .AddEventHandler(object)
        // event handler delegate
        .AddEventHandler(Delegate)
        // event handler generic type, with optional service lifetime
        .AddEventHandler<T>(Func<Type, ServiceLifetime>? = null);
});
```

## IEventHandler

Depending on the value of the `EventStoreOptions.Asynchronous` options, an event handler must implement either the `IAsyncEventHandler` interface for asynchronous support, or `IEventHandler` for synchronous event handling:

```c#
public interface IEventHandler<in T> where T : class
{
    Task ProcessEventAsync(IEventHandlerContext<T> context);
}
```

### IEventHandlerContext

The event handler context provides the full `EventEnvelope` and `PrimitiveEvent`, the actual deserialized domain `Event` containing the original data that was added to the `EventStream`, and a `CancellationToken` that you can interrogate to determine if the processing is still active.

It also contains the `Projection`.

## IProjectionService

The `IProjectionService` interface is implemented by a technology-specific package.  The `Shuttle.Recall.Sql.EventProcessing` package provides a Sql Server based implementation of the `IProjectionService`.

### GetEventAsync

```c#
Task<ProjectionEvent?> GetEventAsync(IPipelineContext<OnGetEvent> pipelineContext);
```

Returns the `ProjectionEvent` that needs to be processed:

``` c#
public class ProjectionEvent
{
    public ProjectionEvent(Projection projection, PrimitiveEvent primitiveEvent)
    {
        Projection = Guard.AgainstNull(projection);
        PrimitiveEvent = Guard.AgainstNull(primitiveEvent);
    }

    public Projection Projection { get; }
    public PrimitiveEvent PrimitiveEvent { get; }
}
```

### AcknowledgeEventAsync

```c#
Task AcknowledgeEventAsync(IPipelineContext<OnAcknowledgeEvent> pipelineContext);
```

Indicates that a projection event has been processed.  The pipeline state contains the relevant object:

``` c#
var projectionEvent = Guard.AgainstNull(pipelineContext).Pipeline.State.GetProjectionEvent();
```