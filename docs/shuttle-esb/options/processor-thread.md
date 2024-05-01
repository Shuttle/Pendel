# Processor Thread Options

```c#
services.AddServiceBus(builder => 
{
    builder.Options.ProcessorThread = new ProcessorThreadOptions
    {
        JoinTimeout = TimeSpan.FromSeconds(15),
        IsBackground = false,
        Priority = ThreadPriority.Normal
    };
})
```

The default JSON settings structure is as follows:

```json
{
  "Shuttle": {
    "ServiceBus": {
      "ProcessorThread": {
        "JoinTimeout": "00:00:15",
        "IsBackground": false,
        "Priority": "Lowest"  
      }
    }
  }
}
```

## Options

| Option | Default | Description |
| --- | --- | --- |
| `JoinTimeout` | `00:00:15` | The duration to allow the processor thread to join the main thread. |
| `IsBackground` | `true` | Indicates whether the thread will be started as a background thread.  Background threads are instantly killed when the host process stops. |
| `Priority` | `ThreadPriority.Normal` | Indicates the [thread priority](https://docs.microsoft.com/en-us/dotnet/api/system.threading.thread.priority?view=net-6.0). |