# Inbox Options

```c#
var configuration = 
    new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();

services.AddHopper(options => 
{
    options.Inbox = new InboxOptions
    {
        WorkTransportUri = new Uri("queue://configuration/inbox-work"),
        DeferredTransportUri = new Uri("queue://configuration/inbox-deferred"),
        ErrorTransportUri = new Uri("queue://configuration/inbox-error"),
        ThreadCount = 25,
        IdleDurations = new List<TimeSpan>
        {
            TimeSpan.FromMilliseconds(250),
            TimeSpan.FromSeconds(10),
            TimeSpan.FromSeconds(30)
        },
        IgnoreOnFailureDurations = new List<TimeSpan>
        {
            TimeSpan.FromSeconds(10),
            TimeSpan.FromSeconds(30)
        },
        MaximumFailureCount = 2,
        DeferredMessageProcessorResetInterval = TimeSpan.FromMinutes(5),
        DeferredMessageProcessorIdleDuration = TimeSpan.FromSeconds(5)
    };
    
    // or bind from configuration
    configuration
        .GetSection(HopperOptions.SectionName)
        .Bind(options);
});
```

The default JSON settings structure is as follows:

```json
{
  "Shuttle": {
    "Hopper": {
      "Inbox": {
        "WorkTransportUri": "queue://configuration/inbox-work",
        "DeferredTransportUri": "queue://configuration/inbox-deferred",
        "ErrorTransportUri": "queue://configuration/inbox-error",
        "ThreadCount": 25,
        "IdleDurations": [
          "00:00:00.250",
          "00:00:10",
          "00:00:30"
        ],
        "IgnoreOnFailureDurations": [
          "00:30:00",
          "01:00:00"
        ],
        "MaximumFailureCount": 25,
        "DeferredMessageProcessorResetInterval": "00:05:00",
        "DeferredMessageProcessorIdleDuration": "00:00:05"
      }
    }
  }
}
```

## Options

| Option                        | Default     | Description    |
| ---                            | ---        | ---            |
| `WorkTransportUri` | | The URI of the transport that will be used to retrieve messages for processing. |
| `DeferredTransportUri` | | The URI of the transport that will be used to store deferred messages. |
| `ErrorTransportUri` | | The URI of the transport that will be used to store messages that fail processing. |
| `ThreadCount`                    | 5            | The number of worker threads that will service the work transport.  The deferred transport will always be serviced by only 1 thread. |
| `IdleDurations`        | 250ms\*4,500ms\*2,1s,5s | A list of `TimeSpan` instances.  Each successive idle processing run will move to the next entry in the list; resets as soon as a message is processed. |
| `IgnoreOnFailureDurations`    | 30s,2m,5m | A list of `TimeSpan` instances.  Each failure will move to the next entry.|
| `MaximumFailureCount`            | 5            | The maximum number of failures that are retried before the message is moved to the error transport if there is one and the transport is not a stream; else the message is released.   |
| `DeferredMessageProcessorResetInterval` | `00:01:00` | The duration to wait before restarting the `DeferredMessageProcessor` once it has halted. |
| `DeferredMessageProcessorIdleDuration` | `00:00:01` | The duration to wait when the `DeferredMessageProcessor` is idle. |

