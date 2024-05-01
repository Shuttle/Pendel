# Deferred Messages

A deferred message is one that cannot/should not be immediately processed.  There are two ways in which a message will be deferred.  The first is when the processing of a message fails and the inbox is configured, as follows, to wait between retries:

```json
{
  "Shuttle": {
    "ServiceBus": {
      "Inbox": {
        "WorkQueueUri": "queue://configuration/server-inbox-work",
        "ErrorQueueUri": "queue://configuration/error",
        "DurationToIgnoreOnFailure": [
          "00:00:10",
          "00:00:30",
          "00:01:00"
        ] 
      }
    }
  }
}
```

The first failure will cause the message to wait for 10 seconds before being tried again.

If there is no deferred queue the message is simply returned to the work queue.  However, the work queue is designed such that processing can occur as quickly as possible so having deferred messages in the work queue will result in some serious queue thrashing.  Having deferred messages in the work queue should be avoided for all but the simplest samples.

## Deferred Queue

A deferred queue may be configured for an inbox, and there are some additional options:

```json
{
  "Shuttle": {
    "ServiceBus": {
      "Inbox": {
        "WorkQueueUri": "queue://configuration/server-inbox-work",
        "DeferredQueueUri": "queue://configuration/server-inbox-deferred",
        "ErrorQueueUri": "queue://configuration/error",
        "DeferredMessageProcessorWaitInterval": "00:00:01",
        "DeferredMessageProcessorResetInterval": "00:01:00"
      }
    }
  }
}
```

The deferred queue is processed in single passes.  It is processed when the endpoint starts up and then only again when required.  At a minimum the deferred queue processor will run after `DeferredMessageProcessorResetInterval` (defaults to `00:01:00` - 1 minute) has passed from the previous run.  The `DeferredMessageProcessorWaitInterval` (defaults to `00:00:01` - 1 second) determines how long the deferred processor thread sleeps when a run is not yet due.

Messages never route directly to a deferred queue.  Instead they always go to the work queue and if the work queue finds a `IgnoreTillDate` in the future in the `TransportMessage` then it is moved to the deferred queue and the next date to process the deferred queue is set to this `IngoreTillDate` if it is less than the current next deferred queue process date.
