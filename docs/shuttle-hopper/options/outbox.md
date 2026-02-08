# Outbox Options

```c#
var configuration = 
    new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();

services.AddHopper(builder => 
{
    builder.Options.Outbox = new OutboxOptions
    {
        WorkTransportUri = new Uri("queue://configuration/outbox-work"),
        ErrorTransportUri = new Uri("queue://configuration/outbox-error"),
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
        MaximumFailureCount = 2
    };
    
    // or bind from configuration
    configuration
        .GetSection(HopperOptions.SectionName)
        .Bind(builder.Options);
});
```

The default JSON settings structure is as follows:

```json
{
  "Shuttle": {
    "Hopper": {
      "Outbox": {
        "WorkTransportUri": "queue://configuration/outbox-work",
        "ErrorTransportUri": "queue://configuration/outbox-error",
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
        "MaximumFailureCount": 25
      }
    }
  }
}
```

## Options

| Options | Default | Description |
| --- | --- | --- |
| `ThreadCount` | `1` | The number of worker threads that will service the work transport. |
| `IdleDurations` | `250ms\*4,500ms\*2,1s,5s` | A list of `TimeSpan` instances.  Each successive idle processing run will move to the next entry in the list; resets as soon as a message is processed. |
| `IgnoreOnFailureDurations` | `30s,2m,5m` | A list of `TimeSpan` instances.  Each failure will move to the next entry. |
| `MaximumFailureCount` | `5` | The maximum number of failures that are retried before the message is moved to the error transport if there is one and the transport is not a stream; else the message is released.   |
