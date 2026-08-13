# Rest Client

The [Shuttle.Access.RestClient](https://www.nuget.org/packages/Shuttle.Access.RestClient) package provides an implementation of the `IAccessClient` interface that can be used to interact with the `Shuttle.Access.WebApi` web API endpoints as *your own application's identity*.

It depends on nothing but `Shuttle.Access.WebApi.Contracts` and needs no incoming request, so it works equally well from a console application.  Securing your own endpoints is a separate concern handled by [Shuttle.Access.AspNetCore](/shuttle-access/sessions) — the two packages do not reference each other.

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

An authentication provider is **required** — it gives the client the identity it calls the web API with, and there is no other credential available to it.  Omitting one fails the host at startup.

To determine what that identity is permitted to do, call `accessClient.Sessions.GetSelfAsync(...)`; `HasPermission(tenantId, permission)` is available on the returned session contract.

::: tip
An authentication provider is *not* needed to secure your endpoints.  Resolving the caller's session forwards the caller's own `Authorization` header and never involves this client.  The two are independent — see [Sessions](/shuttle-access/sessions).
:::

### Password Authentication

To use a simple identity name and password for authentication:

```c#
builder.Services.AddAccessClient(options =>
{
    options.BaseAddress = "http://localhost:5599";
})
.UsePasswordAuthenticationProvider(providerBuilder =>
{
    builder.Configuration.GetSection(PasswordAuthenticationInterceptorOptions.SectionName).Bind(providerBuilder.Options);
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

For more details on how to use the client and authentication providers, please refer to the [Guide](/shuttle-access/guide), [Sessions](/shuttle-access/sessions), and the [JSON Web Tokens](/shuttle-access/json-web-tokens) documentation.
