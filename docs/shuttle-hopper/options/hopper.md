# Hopper Options

The `HopperOptions` represents the initial options that the `IBus` will use to configure the relevant components.

The options are specified when adding Hopper to the `IServiceCollection`:

```c#
var configuration = 
    new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();

services.AddHopper(options => 
{
    // default values
    options.CreatePhysicalTransports = true;
    options.CacheIdentity = true;
    options.RemoveMessagesNotHandled = false;
    options.RemoveCorruptMessages = false;
    options.AutoStart = true;
    
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
      "CreatePhysicalTransports": true,
      "CacheIdentity": true,
      "RemoveMessagesNotHandled": false,
      "RemoveCorruptMessages": false,
      "AutoStart": true,
      "UriMappings": [
        {
          "SourceUri": "shuttle://some-host/some-queue",
          "TargetUri": "rabbitmq://local-host/some-queue"
        }
      ]
    }
  }
}
```

## Options

| Option | Default     | Description    | 
| ---                            | ---        | ---            | 
| `CacheIdentity` | `true` | Determines whether or not to re-use the identity returned by the `IIdentityProvider`. | 
| `CreatePhysicalTransports` | `true` | The endpoint will attempt to create all physical transport structures (e.g., queues or topics). | 
| `RemoveMessagesNotHandled` | `false` | Indicates whether messages received on the endpoint that have no message handler should simply be removed (ignored).  If this attribute is `true` the message will simply be acknowledged; else the message will immediately be placed in the error transport. |
| `RemoveCorruptMessages` | `false` | A message is corrupt when the `TransportMessage` retrieved from the transport cannot be deserialized.  If `false` (default) the process will be killed.  If `true` the message will be acknowledged with no processing. |
| `AutoStart` | `true` | Determines whether the `IBus` will be started automatically when the hosted service starts. |
| `UriMappings` | | A list of `UriMappingOptions` instances that allow mapping a source URI (as used in code) to a target URI (the actual physical transport). |

The `IIdentityProvider` implementation is responsible for honouring the `CacheIdentity` attribute.

## Events

The `HopperOptions` provides several `AsyncEvent` properties that allow you to hook into various stages of the message processing pipeline.

| Event | Description |
| --- | --- |
| `DeferredMessageProcessingAdjusted` | Occurs when the deferred message processing interval is adjusted. |
| `DeferredMessageProcessingHalted` | Occurs when the deferred message processing is halted. |
| `HandlerException` | Occurs when an exception is thrown during message handling. |
| `MessageAcknowledged` | Occurs when a message has been successfully acknowledged by the transport. |
| `MessageDeserializationException` | Occurs when a message payload cannot be deserialized. |
| `MessageNotHandled` | Occurs when no message handler could be found for a received message. |
| `MessageReceived` | Occurs when a message has been received from the transport. |
| `MessageReleased` | Occurs when a message is released back to the transport. |
| `MessageReturned` | Occurs when a message is returned to the transport (e.g., after a failure if no error transport is configured). |
| `MessageSent` | Occurs when a message has been successfully sent. |
| `TransportCreated` | Occurs when a new transport instance is created. |
| `TransportDisposed` | Occurs after a transport instance has been disposed. |
| `TransportDisposing` | Occurs before a transport instance is disposed. |
| `TransportMessageDeferred` | Occurs when a transport message is deferred. |
| `TransportMessageDeserializationException` | Occurs when a transport message envelope cannot be deserialized. |
| `TransportOperation` | Occurs when a transport operation (GET, PUT, ACKNOWLEDGE, RELEASE) is performed. |

## Startup

Once Hopper has been added to a `ServiceCollection` you can start it using one of the following methods:

### Hosted start

```c#
await Host.CreateDefaultBuilder()
    .ConfigureServices((hostContext, services) =>
    {
        var configuration = hostContext.Configuration;

        services
            .AddHopper(options =>
            {
                configuration.GetSection(HopperOptions.SectionName).Bind(options);
            })
            .AddMessageHandler(async (IHandlerContext<RegisterMember> context) =>
            {
                Console.WriteLine();
                Console.WriteLine("[MEMBER REGISTERED] : user name = '{0}'", context.Message.UserName);
                Console.WriteLine();

                await context.SendAsync(new MemberRegistered
                {
                    UserName = context.Message.UserName
                }, transportMessageBuilder => transportMessageBuilder.AsReply());
            })
            .UseAzureStorageQueues(builder =>
            {
                builder.AddOptions("azure", new()
                {
                    ConnectionString = Guard.AgainstNullOrEmptyString(configuration.GetConnectionString("azure"))
                });
            });
    })
    .Build()
    .RunAsync(); // The `BusHostedService` will be invoked which starts the `IBus`.
```

To suppress the registration of the `BusHostedService` use the `SuppressBusHostedService()` method on the `HopperBuilder`.

### Manual start

```c#
var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

var services = new ServiceCollection()
    .AddSingleton<IConfiguration>(configuration)
    .AddHopper(options =>
    {
        configuration.GetSection(HopperOptions.SectionName).Bind(options);
    });

services.AddHopper()
    .AddMessageHandler(async (IHandlerContext<MemberRegistered> context) =>
    {
        Console.WriteLine();
        Console.WriteLine("[RESPONSE RECEIVED] : user name = '{0}'", context.Message.UserName);
        Console.WriteLine();

        await Task.CompletedTask;
    })
    .UseAzureStorageQueues(builder =>
    {
        builder.AddOptions("azure", new()
        {
            ConnectionString = "UseDevelopmentStorage=true;"
        });
    });

var serviceProvider = services.BuildServiceProvider();
var busControl = serviceProvider.GetRequiredService<IBusControl>();

await busControl.StartAsync();

var bus = serviceProvider.GetRequiredService<IBus>();

await bus.SendAsync(new InterestingMessage());

await busControl.StopAsync();
```

