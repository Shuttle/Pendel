# Projections

Event processing relates to the *Query Responsibility* side of the *Command/Query Responsibility Segregation* pattern.

Since the event sourcing side of things produces a series of events that are chronologically ordered we can process those events one after the other to produce any output structures that are required for reporting, querying, or business intelligence.

Each one of these processing streams is called a **projection**.  All events for a given `CorrelationId`, or `Id` if `CorrelationId` is `null`, are processed in order using the `SequenceNumber`.

## EventProcessor

An `EventProcessor` instance is used to manage all the projections.  `Projection` instances may be added to the `EventProcessor` and each runs on its own thread.  In contrast to normal message processing there is no **poison** queue and no retries.  If processing fails for any reason the process should be terminated.

This applies to the *eventual* processing performed by the `EventProcessor` itself.  A projection handler invoked via [immediate consistency](#immediate-consistency) that throws does not terminate the process — see below.

## Projection

A `Projection` has a name and represents a specific set of output data that you are interested in.  Each projection is a logical queue that has a current position within the event stream.  All event store messages should have a global sequence number that is used as a *cursor* of sorts.

When you need to rebuild your read model for whatever reason you can delete the read model, reset the projection's position back to zero (or delete it), and re-run the projection.  One should be cognizant of the fact that rebuilding a projection may take some time and in certain cases it may be worth the effort to create a separate projection that can later be renamed, once it has been populated.

### AddEventHandler

In order to be able to handle any events in your projection you will need to add event handlers to the `ProjectionBuilder` passed to `RecallBuilder.AddProjection`:

```c#
services
    .AddRecall()
    .AddProjection("projection-name", projection =>
    {
        // event handler type, with optional service lifetime
        projection.AddEventHandler(typeof(SomeHandler), type => ServiceLifetime.Scoped);

        // event handler instance (singleton)
        projection.AddEventHandler(someHandlerInstance);

        // event handler delegate
        projection.AddEventHandler(async (IEventHandlerContext<SomeEvent> context) => { /* handle event */ });

        // event handler generic type, with optional service lifetime
        projection.AddEventHandler<SomeHandler>();
    });
```

`RecallBuilder.AddProjection` also has convenience overloads that skip the `ProjectionBuilder` lambda for a single handler: `AddProjection(name, object handler)`, `AddProjection(name, Type handlerType, Func<Type, ServiceLifetime>? = null)`, `AddProjection<THandler>(name, Func<Type, ServiceLifetime>? = null)`, and `AddProjection(name, Delegate handler)`.

Delegate handlers must be `async` and return a `Task`; the event type is inferred from the single `IEventHandlerContext<T>` parameter. They may also declare extra parameters that are resolved from the DI container per invocation, e.g. `async (IEventHandlerContext<SomeEvent> context, SomeDbContext dbContext) => { ... }` — see the [Walkthrough](/shuttle-recall/walkthrough) for a worked example.

## IEventHandler

An event handler must implement the `IEventHandler<in T>` interface:

```c#
public interface IEventHandler<in T> where T : class
{
    Task HandleAsync(IEventHandlerContext<T> context, CancellationToken cancellationToken = default);
}
```

### IEventHandlerContext

The event handler context provides the full `EventEnvelope` and `PrimitiveEvent`, the actual deserialized domain `Event` containing the original data that was added to the `EventStream`, and the `Projection`.

`HandleAsync` itself takes a separate `CancellationToken` parameter that you can interrogate to determine if the processing is still active.

You can also call `Defer(TimeSpan? delay = null)` to have the projection wait for other projections to handle related data.  A default deferred duration may be set using the `RecallOptions.EventProcessing.DefaultDeferredDuration`.  Keep in mind that if the deferred duration is less, and in some cases equal to, a `RecallOptions.EventProcessing.ProjectionProcessorIdleDurations` entry you may end up with a poisoned head event where the same event keeps being picked up for processing.

## Immediate Consistency

By default a projection only ever handles an event once the `EventProcessor` gets round to it in the background.  Immediate consistency lets specific projections handle an event *synchronously*, as part of the `IEventStore.SaveAsync` call that persisted it, so that a read model built from that projection reflects the event by the time `SaveAsync` returns.

Immediate consistency is opt-in and can be turned on in two ways:

- Globally, via `RecallOptions.EventProcessing.ImmediateConsistency.Enabled`, together with `IncludedProjections`/`ExcludedProjections` to control which projections are handled immediately:

```c#
services.AddRecall(options =>
{
    options.EventProcessing.ImmediateConsistency.Enabled = true;
    options.EventProcessing.ImmediateConsistency.IncludedProjections.Add("ProjectionName");
});
```

- Per save, via `EventStreamBuilder.WithImmediateConsistency()` (see [EventStreamBuilder](/shuttle-recall/events/overview#eventstreambuilder)), regardless of whether `Enabled` is set:

```c#
await eventStore.SaveAsync(eventStream, builder =>
{
    builder.WithImmediateConsistency();
});
```

Either way, `IncludedProjections`/`ExcludedProjections` on `ImmediateConsistency` decide which projections are actually handled immediately — these are separate from, and unrelated to, the top-level `EventProcessing.IncludedProjections`/`ExcludedProjections` that decide which projections the `EventProcessor` handles at all.

If a projection's handler throws while being invoked immediately, the event is not lost.  `RecallOptions.EventProcessing.ImmediateConsistencyFailed` is raised, and the `EventProcessor` will still pick up and retry the event on its next pass, just as it would for any other event:

```c#
options.EventProcessing.ImmediateConsistencyFailed += (args, cancellationToken) =>
{
    _logger.LogWarning("Projection '{ProjectionName}' failed to handle event '{EventId}' immediately: {Exception}", args.ProjectionName, args.PrimitiveEvent.EventId, args.Exception);

    return Task.CompletedTask;
};
```

A technology-specific `IProjectionEventService` implementation, such as the one in [Shuttle.Recall.SqlServer.EventProcessing](/shuttle-recall/projections/sql-server#immediate-consistency), is responsible for tracking which events a projection has already handled immediately, so that the `EventProcessor` skips re-invoking that projection's handler for those events while still advancing the projection's checkpoint over them.

## IProjectionEventService

The `IProjectionEventService` interface is implemented by a technology-specific package.  The `Shuttle.Recall.SqlServer.EventProcessing` package provides a Sql Server based implementation (`SequentialProjectionEventService`) — see [Projections: SQL Server](/shuttle-recall/projections/sql-server).

```c#
public interface IProjectionEventService
{
    Task AcknowledgeAsync(IPipelineContext<AcknowledgeEvent> pipelineContext, CancellationToken cancellationToken = default);
    Task<ProjectionEvent?> RetrieveAsync(IPipelineContext<RetrieveEvent> pipelineContext, CancellationToken cancellationToken = default);
    Task DeferAsync(IPipelineContext<HandleEvent> pipelineContext, CancellationToken cancellationToken = default);
    Task PipelineFailedAsync(IPipelineContext<PipelineFailed> pipelineContext, CancellationToken cancellationToken = default);
    Task ProjectionEventHandledAsync(string projectionName, Guid eventId, CancellationToken cancellationToken = default);
}
```

### RetrieveAsync

Returns the next `ProjectionEvent` that needs to be processed, or `null` if there is nothing to do:

``` c#
public class ProjectionEvent
{
    public ProjectionEvent(Projection projection, PrimitiveEvent primitiveEvent, bool alreadyHandled = false)
    {
        Projection = Guard.AgainstNull(projection);
        PrimitiveEvent = Guard.AgainstNull(primitiveEvent);
        AlreadyHandled = alreadyHandled;
    }

    public Projection Projection { get; }
    public PrimitiveEvent PrimitiveEvent { get; }

    // Set by the event-processing implementation when this event has already been handled by this
    // projection via immediate consistency. The handler is skipped, but the projection's checkpoint
    // still advances across it.
    public bool AlreadyHandled { get; }
}
```

### AcknowledgeAsync

Indicates that a projection event has been processed.  The pipeline state contains the relevant object:

``` c#
var projectionEvent = Guard.AgainstNull(pipelineContext).Pipeline.State.GetProjectionEvent();
```

### DeferAsync

Called when a handler has requested that the current event be deferred (see [`Defer`](#ieventhandlercontext) above), so the implementation can requeue/postpone it for later re-processing.

### PipelineFailedAsync

Called when the event-processing pipeline itself fails, giving the implementation a chance to record or react to the failure.

### ProjectionEventHandledAsync

```c#
Task ProjectionEventHandledAsync(string projectionName, Guid eventId, CancellationToken cancellationToken = default);
```

Records that `projectionName` has already handled the event identified by `eventId`, via immediate consistency. `RetrieveAsync` uses this so the eventual event processor skips re-invoking the handler for that event while still advancing the projection's checkpoint across it — see [Immediate Consistency](#immediate-consistency) and [Shuttle.Recall.SqlServer.EventProcessing](/shuttle-recall/projections/sql-server#immediate-consistency).
