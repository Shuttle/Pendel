# Request / Response

::: info
Remember that you can download the samples from the <a href="https://github.com/Shuttle/Shuttle.Hopper.Samples" target="_blank">GitHub repository</a>.
:::

This sample makes use of [Shuttle.Hopper.AzureStorageQueues](https://github.com/Shuttle/Shuttle.Hopper.AzureStorageQueues) for the message transports.  Local Azure Storage Queues should be provided by [Azurite](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite).

Once you have opened the `Shuttle.RequestResponse.sln` solution in Visual Studio set the following projects as startup projects:

- Shuttle.RequestResponse.Client
- Shuttle.RequestResponse.Server

## Implementation

In order to get any processing done in Shuttle.Hopper a message will need to be generated and sent to an endpoint for processing.  The idea behind a **command** message is that there is exactly **one** endpoint handling the message.  Since it is an instruction the message absolutely ***has*** to be handled and we also need to have only a single endpoint process the message to ensure a consistent result.

In this guide we'll create the following projects:

- `Shuttle.RequestResponse.Client` (**Console Application**)
- `Shuttle.RequestResponse.Server` (**Console Application**)
- `Shuttle.RequestResponse.Messages` (**Class Library**)

## Messages

> Create a new class library called `Shuttle.RequestResponse.Messages` with a solution called `Shuttle.RequestResponse`

**Note**: remember to change the *Solution name*.

### RegisterMember

> Rename the `Class1` default file to `RegisterMember` and add a `UserName` property.

``` c#
namespace Shuttle.RequestResponse.Messages
{
	public class RegisterMember
	{
		public string UserName { get; set; }
	}
}
```

### MemberRegistered

> Add a new class called `MemberRegistered` also with a `UserName` property.

``` c#
namespace Shuttle.RequestResponse.Messages
{
	public class MemberRegistered
	{
		public string UserName { get; set; }
	}
}
```

## Client

> Add a new `Console Application` to the solution called `Shuttle.RequestResponse.Client`.

> Install the `Shuttle.Hopper.AzureStorageQueues` nuget package.

This will provide access to the Azure Storage Queues `ITransport` implementation and also include the required dependencies.

> Install the `Microsoft.Extensions.Configuration.Json` nuget package.

This will provide the ability to read the `appsettings.json` file.

> Add a reference to the `Shuttle.RequestResponse.Messages` project.

### Program

> Implement the main client code as follows:

```c#
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shuttle.Hopper;
using Shuttle.Hopper.AzureStorageQueues;
using Shuttle.RequestResponse.Messages;

namespace Shuttle.RequestResponse.Client;

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

        string? userName;

        while (!string.IsNullOrEmpty(userName = Console.ReadLine()))
        {
            await bus.SendAsync(new RegisterMember
            {
                UserName = userName
            }, builder => builder.ExpiresAt(DateTime.Now.AddSeconds(5)));
        }

        await busControl.StopAsync();
    }
}
```

### Client configuration file

> Add an `appsettings.json` file as follows:

```json
{
  "Shuttle": {
    "Hopper": {
      "Inbox": {
        "WorkTransportUri": "azuresq://azure/shuttle-client-work",
        "ErrorTransportUri": "azuresq://azure/shuttle-error",
        "ThreadCount": 1
      }, 
      "MessageRoutes": [
        {
          "Uri": "azuresq://azure/shuttle-server-work",
          "Specifications": [
            {
              "Name": "StartsWith",
              "Value": "Shuttle.RequestResponse.Messages"
            }
          ]
        }
      ]
    } 
  } 
}
```

This tells the endpoint that all messages sent having a type name starting with `Shuttle.RequestResponse.Messages` should be routed to endpoint `azuresq://azure/shuttle-server-work`.

### MemberRegisteredHandler

> Create a new class called `MemberRegisteredHandler` that implements the `IMessageHandler<MemberRegistered>` interface as follows:

``` c#
using System;
using System.Threading.Tasks;
using Shuttle.Hopper;
using Shuttle.RequestResponse.Messages;

namespace Shuttle.RequestResponse.Client;

public class MemberRegisteredHandler : IContextMessageHandler<MemberRegistered>
{
    public async Task HandleAsync(IHandlerContext<MemberRegistered> context, CancellationToken cancellationToken = default)
    {
        Console.WriteLine();
        Console.WriteLine("[RESPONSE RECEIVED] : user name = '{0}'", context.Message.UserName);
        Console.WriteLine();

        await Task.CompletedTask;
    }
}
```

## Server

> Add a new `Console Application` to the solution called `Shuttle.RequestResponse.Server`.

> Install the `Shuttle.Hopper.AzureStorageQueues` nuget package.

This will provide access to the Azure Storage Queues `ITransport` implementation and also include the required dependencies.

> Install the `Microsoft.Extensions.Hosting` nuget package.

This allows a console application to be hosted using the .NET generic host.

> Install the `Microsoft.Extensions.Configuration.Json` nuget package.

This will provide the ability to read the `appsettings.json` file.

> Add a reference to the `Shuttle.RequestResponse.Messages` project.

### Program

> Implement the `Program` class as follows:

``` c#
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Shuttle.Contract;
using Shuttle.Hopper;
using Shuttle.Hopper.AzureStorageQueues;

namespace Shuttle.RequestResponse.Server;

internal class Program
{
    private static async Task Main()
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
                            options.ConnectionString = Guard.AgainstNullOrEmptyString(configuration.GetConnectionString("azure"));
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
using Shuttle.Hopper;
using Shuttle.RequestResponse.Messages;

namespace Shuttle.RequestResponse.Server;

public class RegisterMemberHandler : IContextMessageHandler<RegisterMember>
{
    public async Task HandleAsync(IHandlerContext<RegisterMember> context, CancellationToken cancellationToken = default)
    {
        Console.WriteLine();
        Console.WriteLine("[MEMBER REGISTERED] : user name = '{0}'", context.Message.UserName);
        Console.WriteLine();

        await context.SendAsync(new MemberRegistered
        {
            UserName = context.Message.UserName
        }, builder => builder.AsReply());
    }
}
```


## Run

> Set both the client and server projects as startup projects.

### Execute

> Execute the application.

> The **client** application will wait for you to input a user name.  For this example enter **my user name** and press enter:

::: info 
You will observe that the server application has processed the message.
:::

::: info 
The client application will then process the response returned by the server.
:::

You have now completed a full request / response call chain.

