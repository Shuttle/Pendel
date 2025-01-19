# Events

## EventStore

An `EventStream` contains events for a given `Guid` identifier and is kept outside of your object at all times.

Your domain object would only be concerned about handling the relevant commands issued to it and returning one or more events from those methods.  These will then be added to your `EventStream` before being persisted using an `IEventStore` implementation.

``` c#
var store = serviceProvider.GetRequiredService<IEventStore>();

var aggregate = new Aggregate(Guid.NewGuid());

var eventStream = await store.GetAsync(aggregate.Id);

eventStream.Add(aggregate.Move(moveCommand));

await store.SaveAsync(eventStream);

eventStream = await store.GetAsync(aggregate.Id);

Assert.IsFalse(eventStream.IsEmpty);

await store.RemoveAsync(aggregate.Id);

eventStream = await store.GetAsync(aggregate.Id);

Assert.IsTrue(eventStream.IsEmpty);
```

## EventStream

Typically you would not create an `EventStream` directly but rather make use of an `IEventStore.GetAsync` method.  You would, however, add events to an `EventStream` and call the `Apply` method to apply all events within the stream to a given object.

An event stream has a `Guid` identifier that is the surrogate key used by the `IEventStore` for your aggregate.  It also has a version number that starts at 1.  Each time an event is added to the stream the version is incremented by 1 and the version number is assigned to the event.  This version is used to check for concurrency violations.  When you get an `EventStream` from an `IEventStore` implementation the initial version is set the in the stream.  When you try to save the event stream and the version of the event stream in the store does not match the initial version of the stream an `EventStreamConcurrencyException` is raised by the `IEventStore` implementation.

As you can imagine, over time an `EventStream` may become quite large.  You would need to explicitly deal with these situations by modeling an appropriate solution, such as when using the [Closing the Books pattern](https://event-driven.io/en/closing_the_books_in_practice/).  This would result in multiple aggregate roots representing a subset of the events.  You would, typically, have an overarching aggregate root that manages these subsets.  Event ordering is determined by a `CorrelationId` on the aggregate roots.  Your aggregate root the manages this subsets would set the `CorrelationId` for itself and the subsets.  IN this way, the projection sequence is maintained.  Projection implemenations will use the `CorrelationId` and `SequenceNumber` to determine the sequence.  If no `CorrelationId` is set, then the `Id` and `SequenceNumber` will be used.

### Constructor

``` c#
public EventStream(Guid id, IEventMethodInvoker eventMethodInvoker);
public EventStream(Guid id, int version, IEventMethodInvoker eventMethodInvoker, IEnumerable<DomainEvent>? events = null)
```

Creates a new `EventStream` instance with the given properties.  The `IEventMethodInvoker` is responsible for invoking the relevant method related to the event on a provided aggregate instance.

### Properties

``` c#
public Guid? CorrelationId { get; private set; }
public Guid Id { get; private set; }
public int Version { get; private set; }
public int Count => (_events?.Count ?? 0) + _appendedEvents.Count;
public bool IsEmpty => Count == 0;
public bool Removed { get; private set; }
```

### Remove

``` c#
public void Remove()
```

This will set the `Removed` property to `true`.  When the `EventStream` is saved using an `IEventStore` implementation it is the responsibility of the event store to remove all the events associated with the `Id`.

### Commit

``` c#
public void Commit()
```

Adds any appended events to the events and makes the initial version of the stream the current version which is the version number of the last event appended.

### Add

``` c#
public void Add(object data)
```

Adds a new event to the stream with the next version number applied.  This is an instance of any class.  Events will be defined by your domain:

``` c#
public class ItemAdded
{
    public Guid ProductId { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
}

var stream = await eventStore.GetAsync(Guid.NewGuid());

var itemAdded = new ItemAdded
        {
            ProductId = Guid.NewGuid(),
            Description = "SampleItem",
            Price = 125.50
        };
                
stream.Add(itemAdded);
```

It will be up to the event store implementation to serialize the event data and persist it.

### ShouldSave

``` c#
public bool ShouldSave()
```

Returns `true` if there are are any appended events; else `false`.

### GetEvents

``` c#
public IEnumerable<DomainEvent> GetEvents(EventRegistrationType type = EventRegistrationType.Appended)
```

Returns the events represented by the given `EventRegistrationType`.

### Apply

``` c#
public void Apply(object instance);
```

Applies all the events in the stream against the given object by calling the `IEventMethodInvoker` provided to the event strean constructor. 

The following is an example of an event method:

``` c#
private void On(Sample.Events.v1.SomeEvent someEvent)
{
    _someData = someEvent.SomeData;
}
```

### ConcurrencyInvariant

``` c#
public void ConcurrencyInvariant(int expectedVersion)
```

If the event stream's version is not at the `expectedVersion` an `EventStreamConcurrencyException` is thrown.

# IEventStore

An `IEventStore` implementation should be able to persist and retrieve an `EventStream`:

### Get

``` c#
Task<EventStream> GetAsync(Guid id, Action<EventStreamBuilder>? builder = null);
```

Returns an `EventStream` containing all events available for the `id`; if it is a new stream where there are no event available, an empty stream is returned.

Passing an empty `Guid` (`00000000-0000-0000-0000-000000000000`) will immediately return a new, empty, stream.

### Remove

``` c#
Task RemoveAsync(Guid id);
```

All events that belong to the given `id` are removed.

### Save

``` c#
ValueTask<long> SaveAsync(EventStream eventStream, Action<EventStreamBuilder>? builder = null);
```

Persists the given `EventStream`.