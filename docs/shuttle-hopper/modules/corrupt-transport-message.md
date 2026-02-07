# Corrupt Transport Message

```
PM> Install-Package Shuttle.Esb.CorruptTransportMessage
```

## Configuration

```c#
services.AddCorruptTransportMessage(builder => 
{
	builder.Options.MessageFolder = ".\\corrupt-transport-messages"; // default
});
```

The default JSON settings structure is as follows:

```json
{
  "Shuttle": {
    "Modules": {
      "CorruptTransportMessage": {
        "MessageFolder": ".\\folder"
      }
    }
  }
}
```