# Guide

This guide assumes that you are either running the [Shuttle.Access](https://github.com/Shuttle/Shuttle.Access) solution or the [docker-compose](/shuttle-access/docker-compose) containers.

## Access

Navigate to the [front-end](http://localhost:3000) and log in using an identity that has `Administrator` privileges.

- Create these identities:
  - `guide-user` with a password of `guide-password`
  - `AccessGuide.WebApi` with a password of `AccessGuide.WebApi:Password`
- If there is only 1 tenant available the identities will be assigned to that tenants; else, assign the identities to the relevant tenant.
- Create a permission called `weather://forecast/view`.
- Create a role called `Trusted Identity` and assign the following permissions:
  - `access://sessions/view`
  - `access://sessions/register`
- A role called `Weather Reader` and assign it the `weather://forecast/view` permission.
- Assign the `Weather Reader` role to the `guide-user` identity.
- Assign the `Trusted Identity` role to the `AccessGuide.WebApi` identity.

## Minimal API

Create a new .Net 10 `ASP.NET Core Web API` project called `AccessGuide.WebApi` and remember to un-check the `Use controllers` option and to check the `Enable OpenAPI support` option.

Add the `Scalar.AspNetCore` NuGet package and configure it:

```c#
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options
            .WithTitle("Shuttle.Access Guide API")
            .WithTheme(ScalarTheme.DeepSpace)
            .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
    });
}
```

Also update the `launchSettings.json` to open the Scalar UI:

```json
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "scalar/v1",
      "applicationUrl": "http://localhost:<PORT>", <-- use the port assigned
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

If you run the application you should be able to invoke the `GET http://localhost:{port}/weatherforecast` endpoint to return a list of temperature readings.

Add the following NuGet packages to the project:

- Shuttle.Access.AspNetCore
- Shuttle.Access.RestClient

To enable the `Shuttle.Access` authorization we need to add the following:

```c#
// var builder = WebApplication.CreateBuilder(args); <-- at some point after

builder.Services.AddAccessAuthorization();

// The client application (the Web API in this case) needs to be able to retrieve session 
// data from the Shuttle.Access.WebApi. This means that the client application needs 
// to be authenticated and register a session, which will have the permissions associated 
// with the relevant identity.  We'll use the 'AccessGuide.WebApi' credentials
// that we registered above.
builder.Services.AddAccessClient(options =>
{
    options.BaseAddress = "http://localhost:5599";
})
.UsePasswordAuthenticationProvider(options =>
{
    options.IdentityName = "AccessGuide.WebApi";
    options.Password = "AccessGuide.WebApi:Password";
});
// We could also use a Bearer token for an Azure identity, for instance.
//.UseBearerAuthenticationProvider(options =>
//{
//    options.GetBearerAuthenticationContextAsync = async (httpRequestMessage, serviceProvider) =>
//    {
//        var credential = new Azure.Identity.DefaultAzureCredential();
//        var scopes = new[] { "https://management.azure.com/.default" };
//        return (await credential.GetTokenAsync(new(scopes), CancellationToken.None)).Token;
//    };
//})


```c#
// var app = builder.Build(); <-- at some point after

app.UseAccessAuthorization();
```

Then we need to require a permission on the mapping by adding `.RequirePermission("weather://forecast/view")`:

```c#
app.MapGet("/weatherforecast", (HttpContext httpContext) =>
{
    /// existing code
})
.RequirePermission("weather://forecast/view") // <-- add this
.WithName("GetWeatherForecast")
.WithOpenApi();
```

If you run the application and invoke the `GET http://localhost:{port}/weatherforecast` endpoint you should receive a `401 Unauthorized` error.

This is because we have not specified the session token.

Use the `Shuttle.Access` [Web API](http://localhost:5599/scalar/v1) to register a session by invoking the `POST /v1/sessions` endpoint with the following body:

```json
{
  "identityName": "guide-user",
  "password": "guide-password"
}
```

You should receive a response with the following structure:

```json
{
  "session": {
    "dateRegistered": "2026-04-18T18:44:05.3055185+00:00",
    "expiryDate": "2026-04-19T02:44:05.3055422+00:00",
    "identityDescription": "",
    "identityId": "49a37e3d-b44e-456b-9a22-8b01a2ca78b2",
    "identityName": "guide-user",
    "permissions": [
      {
        "description": "",
        "id": "88de8145-5de9-4a68-9172-dafdda0aa32e",
        "name": "weather://forecast/view",
        "status": 1,
        "statusName": "Active"
      }
    ],
    "tenantId": "c3ee3908-716b-48df-abda-33b49e09be97",
    "tenantName": "System",
    "id": "017635dc-bc59-49cf-bcc5-b5af76387869",
    "tokenHash": "APInB/Lwl2OC9I5NGmh7EJi81QzpRA0ni5DsQDeR+Zk="
  },
  "registrationRequested": false,
  "result": "Registered",
  "token": "78340363-1773-4fe6-a07d-061eb710ab44",
  "tenants": [
    {
      "id": "c3ee3908-716b-48df-abda-33b49e09be97",
      "name": "System",
      "status": 1,
      "statusName": "Active",
      "logoSvg": "",
      "logoUrl": ""
    }
  ]
}
```

Copy the `token` and then add an `Authorize` header to the `AccessGuide.WebApi` Scalar `/weatherforecast` request with a value of `Shuttle.Access token=<the-token-value>` (without the `<>`).

When you invoke the `GET http://localhost:{port}/weatherforecast` endpoint now you should have access.
