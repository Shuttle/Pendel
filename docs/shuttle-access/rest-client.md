# Rest Client

The [Shuttle.Access.RestClient](https://www.nuget.org/packages/Shuttle.Access.RestClient) package provides an implementation of the `IAccessClient` interface that can be used to interact with the `Shuttle.Access.WebApi` web API endpoints.

## Installation

Add the NuGet package to your project:

```shell
dotnet add package Shuttle.Access.RestClient
```

## Configuration

You can register the access client using the `AddAccessClient` extension method:

```c#
builder.Services.AddAccessClient(options =>
{
    options.BaseAddress = "http://localhost:5599";
});
```

The client requires an authentication provider to be registered in order to interact with the web API as an identity.

### Password Authentication

To use a simple identity name and password for authentication:

```c#
builder.Services.AddAccessClient(options =>
{
    options.BaseAddress = "http://localhost:5599";
})
.UsePasswordAuthenticationProvider(providerBuilder =>
{
    providerBuilder.Options.IdentityName = "identity-name";
    providerBuilder.Options.Password = "password";
});
```

### Bearer Authentication

To use a JWT bearer token for authentication:

```c#
builder.Services.AddAccessClient(options =>
{
    options.BaseAddress = "http://localhost:5599";
})
.UseBearerAuthenticationProvider(providerBuilder =>
{
    providerBuilder.Options.GetBearerAuthenticationContextAsync = async (httpRequestMessage, serviceProvider) => 
    {
        return new BearerAuthenticationContext("your-jwt-token");
    };
});
```

For more details on how to use the client and authentication providers, please refer to the [Guide](/shuttle-access/guide) and the [JSON Web Tokens](/shuttle-access/json-web-tokens) documentation.
