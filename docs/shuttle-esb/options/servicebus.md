# Service Bus Options

The `ServiceBusOptions` represents the initial options that the `ServiceBus` will use to configure the relevant components.

The options are specified in the `ServiceBusBuilder` when adding the service bus to the `IServiceCollection`:

```c#
var configuration = 
    new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();

services.AddServiceBus(builder => 
{
    // default values
    builder.Options.CreatePhysicalQueues = true;
    builder.Options.CacheIdentity = true;
    builder.Options.AddMessageHandlers = true;
    builder.Options.RemoveMessagesNotHandled = false;
    builder.Options.RemoveCorruptMessages = false;
    builder.Options.EncryptionAlgorithm = string.Empty;
    builder.Options.CompressionAlgorithm = string.Empty;
    
    // or bind from configuration
    configuration
        .GetSection(ServiceBusOptions.SectionName)
        .Bind(builder.Options);
})
```

The default JSON settings structure is as follows:

```json
{
  "Shuttle": {
    "ServiceBus": {
      "CreatePhysicalQueues": true,
      "CacheIdentity": true,
      "AddMessageHandlers": true,
      "RemoveMessagesNotHandled": true,
      "RemoveCorruptMessages": true,
      "CompressionAlgorithm": "GZip",
      "EncryptionAlgorithm": "3DES",
    }
  }
}
```

## Options

| Option | Default     | Description    | 
| ---                            | ---        | ---            | 
| `AddMessageHandlers` | `true` | If `true`, will call the `AddMessageHandlers` method on the `ServiceBusBuilder` implementation for all assemblies in the current domain; else only the handlers in `Shuttle.Esb` are registered. | 
| `CacheIdentity` | `true` | Determines whether or not to re-use the identity returned by the `IIdentityProvider`. | 
| `CreateQueues` | `true` | The endpoint will attempt to create all queues. | 
| `RemoveMessagesNotHandled` | `false` | Indicates whether messages received on the endpoint that have no message handler should simply be removed (ignored).  If this attribute is `true` the message will simply be acknowledged; else the message will immmediately be placed in the error queue. |
| `RemoveCorruptMessages` | `false` | A message is corrupt when the `TransportMessage` retrieved from the queue cannot be deserialized.  If `false` (default) the service bus processed will be killed.  If `true` the messae will be `Acknowledged` with no processing. |
| `CompressionAlgorithm` | empty (no compression) | The name of the compression algorithm to use during message serialization. |
| `EncryptionAlgorithm` | empty (no encryption) | The name of the encryption algorithm to use during message serialization. |

The `IIdentityProvider` implementation is responsible for honouring the `CacheIdentity` attribute.

## Startup

Once the `ServiceBus` has been added to a `ServiceCollection` you can start it using one of the following methods:-

### Hosted start

```
await Host.CreateDefaultBuilder()
    .ConfigureServices(services =>
    {
        var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

        services
            .AddSingleton<IConfiguration>(configuration)
            .AddServiceBus(builder =>
            {
                configuration.GetSection(ServiceBusOptions.SectionName).Bind(builder.Options);

                builder.AddMessageHandler(async (IHandlerContext<RegisterMember> context) =>
                {
                    Console.WriteLine();
                    Console.WriteLine("[MEMBER REGISTERED] : user name = '{0}'", context.Message.UserName);
                    Console.WriteLine();

                    await context.SendAsync(new MemberRegistered
                    {
                        UserName = context.Message.UserName
                    }, transportMessageBuilder => transportMessageBuilder.Reply());
                });

                // To suppress the registration of the `ServiceBusHostedService` use this:
                builder.SuppressHostedService();
            })
            .AddAzureStorageQueues(builder =>
            {
                builder.AddOptions("azure", new()
                {
                    ConnectionString = Guard.AgainstNullOrEmptyString(configuration.GetConnectionString("azure"))
                });
            });
    })
    .Build()
    .RunAsync(); // The `ServiceBusHostedService` will be invoked which starts the `ServiceBus`.
```

### Manual start

```
var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

var services = new ServiceCollection()
    .AddSingleton<IConfiguration>(configuration)
    .AddServiceBus(builder =>
    {
        configuration.GetSection(ServiceBusOptions.SectionName).Bind(builder.Options);

        builder.AddMessageHandler(async (IHandlerContext<MemberRegistered> context) =>
        {
            Console.WriteLine();
            Console.WriteLine("[RESPONSE RECEIVED] : user name = '{0}'", context.Message.UserName);
            Console.WriteLine();

            await Task.CompletedTask;
        });
    })
    .AddAzureStorageQueues(builder =>
    {
        builder.AddOptions("azure", new()
        {
            ConnectionString = "UseDevelopmentStorage=true;"
        });
    });

await using (var serviceBus = await services.BuildServiceProvider().GetRequiredService<IServiceBus>().StartAsync())
{
    await serviceBus.SendAsync(new InterestingMessage());
}
```