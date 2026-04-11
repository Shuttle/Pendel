# Deferred Messages

::: info
Remember that you can download the samples from the <a href="https://github.com/Shuttle/Shuttle.Hopper.Samples" target="_blank">GitHub repository</a>.
:::

This sample makes use of [Shuttle.Hopper.AzureStorageQueues](https://github.com/Shuttle/Shuttle.Hopper.AzureStorageQueues) for the message transports.  Local Azure Storage Queues should be provided by [Azurite](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite).

Once you have opened the `Shuttle.Deferred.sln` solution in Visual Studio set the following projects as startup projects:

- Shuttle.Deferred.Client
- Shuttle.Deferred.Server

## Implementation

Deferred messages refer to messages that are not immediately processed when available but are rather set to only process at a given future date.

In this guide we'll create the following projects:

- `Shuttle.Deferred.Client` (**Console Application**)
- `Shuttle.Deferred.Server` (**Console Application**)
- `Shuttle.Deferred.Messages` (**Class Library**)

## Messages

> Create a new class library called `Shuttle.Deferred.Messages` with a solution called `Shuttle.Deferred`

**Note**: remember to change the *Solution name*.

### RegisterMember

> Rename the `Class1` default file to `RegisterMember` and add a `UserName` property.

``` c#
namespace Shuttle.Deferred.Messages;

public class RegisterMember
{
    public string UserName { get; set; }
}
```

## Client

> Add a new `Console Application` to the solution called `Shuttle.Deferred.Client`.

> Install the `Shuttle.Hopper.AzureStorageQueues` nuget package.

This will provide access to the Azure Storage Queues `ITransport` implementation and also include the required dependencies.

> Install the `Microsoft.Extensions.Configuration.Json` nuget package.

This will provide the ability to read the `appsettings.json` file.

> Add a reference to the `Shuttle.Deferred.Messages` project.

### Program

> Implement the main client code as follows:

```c#
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shuttle.Deferred.Messages;
using Shuttle.Hopper;
using Shuttle.Hopper.AzureStorageQueues;

namespace Shuttle.Deferred.Client;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json").Build();

        var services = new ServiceCollection()
            .AddSingleton<IConfiguration>(configuration)
            .AddHopper(options =>
            {
                configuration.GetSection(HopperOptions.SectionName)
                    .Bind(options);
            })
            .UseAzureStorageQueues(builder =>
            {
                builder.Configure("azure", options =>
                {
                    options.ConnectionString = "UseDevelopmentStorage=true;";
                });
            });

        Console.WriteLine("Type some characters and then press [enter] to submit; an empty line submission stops execution:");
        Console.WriteLine();

        var serviceProvider = services.BuildServiceProvider();
        var busControl = serviceProvider.GetRequiredService<IBusControl>();

        await busControl.StartAsync();

        var bus = serviceProvider.GetRequiredService<IBus>();

        string userName;

        while (!string.IsNullOrEmpty(userName = Console.ReadLine() ?? string.Empty))
        {
            await bus.SendAsync(new RegisterMember
            {
                UserName = userName
            }, builder => builder.DeferUntil(DateTime.Now.AddSeconds(5)));
        }

        await busControl.StopAsync();
    }
}
```

The message sent will have its `IgnoreUntil` (on the `TransportMessage`) set to 5 seconds into the future.

### Client configuration file

> Add an `appsettings.json` file as follows:

```json
{
  "Shuttle": {
    "Hopper": {
      "MessageRoutes": [
        {
          "Uri": "azuresq://azure/shuttle-server-work",
          "Specifications": [
            {
              "Name": "StartsWith",
              "Value": "Shuttle.Deferred.Messages"
            }
          ]
        }
      ]
    }
  }
}
```

This tells the endpoint that all messages sent having a type name starting with `Shuttle.Deferred.Messages` should be sent to endpoint `azuresq://azure/shuttle-server-work`.

## Server

> Add a new `Console Application` to the solution called `Shuttle.Deferred.Server`.

> Install the `Shuttle.Hopper.AzureStorageQueues` nuget package.

This will provide access to the Azure Storage Queues `ITransport` implementation and also include the required dependencies.

> Install the `Microsoft.Extensions.Hosting` nuget package.

This allows a console application to be hosted using the .NET generic host.

> Install the `Microsoft.Extensions.Configuration.Json` nuget package.

This will provide the ability to read the `appsettings.json` file.

> Add a reference to the `Shuttle.Deferred.Messages` project.

### Program

> Implement the `Program` class as follows:

``` c#
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Shuttle.Hopper;
using Shuttle.Hopper.AzureStorageQueues;

namespace Shuttle.Deferred.Server;

public class Program
{
    public static async Task Main()
    {
        await Host.CreateDefaultBuilder()
            .ConfigureServices((hostContext, services) =>
            {
                var configuration = hostContext.Configuration;

                services
                    .AddHopper(options =>
                    {
                        configuration.GetSection(HopperOptions.SectionName)
                            .Bind(options);
                    })
                    .UseAzureStorageQueues(builder =>
                    {
                        builder.Configure("azure", options =>
                        {
                            options.ConnectionString = configuration.GetConnectionString("azure")!;
                        });
                    });
            })
            .Build()
            .RunAsync();
    }
}
```

### Server configuration file

> Add an `appsettings.json` file as follows:

```json
{
  "ConnectionStrings": {
    "azure": "UseDevelopmentStorage=true;"
  },
  "Shuttle": {
    "Hopper": {
      "Inbox": {
        "WorkTransportUri": "azuresq://azure/shuttle-server-work",
        "DeferredTransportUri": "azuresq://azure/shuttle-server-deferred",
        "ErrorTransportUri": "azuresq://azure/shuttle-error"
      }
    }
  }
}
```

### RegisterMemberHandler

> Add a new class called `RegisterMemberHandler` that implements the `IMessageHandler<RegisterMember>` interface as follows:

``` c#
using System;
using System.Threading.Tasks;
using Shuttle.Deferred.Messages;
using Shuttle.Hopper;

namespace Shuttle.Deferred.Server;

public class RegisterMemberHandler : IContextMessageHandler<RegisterMember>
{
    public async Task HandleAsync(IHandlerContext<RegisterMember> context, CancellationToken cancellationToken = default)
    {
        Console.WriteLine($"[MEMBER REGISTERED] : user name = '{context.Message.UserName}'");

        await Task.CompletedTask;
    }
}
```


## Run

> Set both the client and server projects as the startup.

### Execute

> Execute the application.

> The **client** application will wait for you to input a user name.  For this example enter **my user name** and press enter:

::: info 
After 5 seconds you will observe that the server application has processed the message.
:::

You have now implemented deferred message sending.
