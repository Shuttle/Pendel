# Consistency

Shuttle.Access is event-sourced, using [Shuttle.Recall](/shuttle-recall/home): every mutation is appended to an event
store, and the `Identity`, `Permission`, `Role`, and `Tenant` read models used to answer queries are projections built
from those events. That split raises an obvious question — once a mutation has been accepted, when is it safe to
assume a subsequent query will reflect it?

`Shuttle.Access.WebApi` answers this per-deployment, with a single setting:

```json
{
  "Shuttle": {
    "Recall": {
      "EventProcessing": {
        "ImmediateConsistency": {
          "Enabled": true
        }
      }
    }
  }
}
```

## The two modes

|                                       | Immediate (`Enabled: true`, the web API's default)        | Eventual (`Enabled: false`)                                  |
| ------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| Where the command runs                | in-process, inside the `Shuttle.Access.WebApi` request       | on the separate `Shuttle.Access.Server` process                |
| How it gets there                     | dispatched straight to a `Shuttle.Mediator` participant       | sent as a message over the Hopper bus to the server's inbox    |
| When projections update               | synchronously, before the HTTP response is returned          | asynchronously, whenever the server's background event processor gets to it |
| Read-your-writes                      | guaranteed                                                    | **not** guaranteed — a query right after a write may still see the old state |
| Requires `Shuttle.Access.Server` running | no                                                          | yes                                                             |

Every mutating endpoint goes through `MessageDispatcher`, which builds both a Hopper message and the equivalent
`Shuttle.Mediator` participant message, and picks one at dispatch time based on
`RecallOptions.EventProcessing.ImmediateConsistency.Enabled`:

```c#
public class MessageDispatcher(IOptions<RecallOptions> recallOptions, IMediator mediator, IBus bus)
{
    public Task DispatchAsync<THopperMessage, TParticipantMessage>(
        Func<THopperMessage> hopperMessage,
        Func<TParticipantMessage> participantMessage,
        CancellationToken cancellationToken = default)
        where THopperMessage : class
        where TParticipantMessage : class
    {
        return recallOptions.Value.EventProcessing.ImmediateConsistency.Enabled
            ? mediator.SendAsync(participantMessage(), cancellationToken)
            : bus.SendAsync(hopperMessage(), cancellationToken);
    }
}
```

::: tip Only the message actually needed is built
The unused `Func<>` is never invoked, since participant messages validate eagerly (via `Guard` clauses) in ways the
equivalent Hopper message may not.
:::

## Why the web API needs its own primitive event sequencer

When immediate consistency is enabled, `Shuttle.Access.WebApi` also registers Recall's primitive event sequencer
in-process, via `RegisterPrimitiveEventSequencing()`. Normally, whichever process is expected to be running
continuously — here, `Shuttle.Access.Server` — owns assigning sequence numbers to newly-saved events. But once the
web API starts saving events itself and applying their projections synchronously, it can no longer wait on the
server to get around to sequencing them; it needs to do so itself, immediately, as part of the same save.
`Shuttle.Access.Server` registers the sequencer unconditionally, since it is the one process guaranteed to be
running whenever eventual consistency is in play.

## Failure handling

If a projection handler throws while running immediately, the event is not lost. `Shuttle.Recall` raises
`EventProcessing.ImmediateConsistencyFailed`, and the event is still picked up and retried by the eventual event
processor on `Shuttle.Access.Server`'s next pass — immediate consistency is a latency guarantee on the happy path,
not a replacement for the eventual processor.

See `Shuttle.Recall`'s [Immediate Consistency](/shuttle-recall/projections/overview#immediate-consistency)
documentation for the general mechanism this builds on.

## Choosing a mode

Prefer **immediate** consistency for a single-instance/all-in-one deployment — the [Docker Compose](/shuttle-access/docker-compose)
and [Docker](/shuttle-access/docker) guides both use it. It guarantees a client's next query reflects its own write,
at the cost of doing the projection work on the request thread.

Prefer **eventual** consistency when scaling `Shuttle.Access.WebApi` out horizontally behind a load balancer. A
single `Shuttle.Access.Server` instance then owns all projection writes, instead of every web API replica racing to
apply the same event immediately.
