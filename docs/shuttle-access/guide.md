# Guide

This guide assumes that you are either running the [Shuttle.Access](https://github.com/Shuttle/Shuttle.Access) solution or the [docker-compose](/shuttle-access/docker-compose) containers.

## Access

Navigate to the [front-end](http://localhost:3000) and log in using an identity that has `Administrator` privileges.

Create the following entities:-

- These identities:
  - `guide-user` with a password of `guide-password`
  - `AccessGuide.WebApi` with a password of `AccessGuide.WebApi:Password`
- This permission:
  - `weather://forecast/view`
- A role called `Trusted Identity` and assign the following permissions:
  - `access://sessions/view`
  - `access://sessions/register`
- A role called `Weather Reader` and assign this permission:
  - `weather://forecast/view`
- Assign ths role to the `guide-user` identity:
  - `Weather Reader`
- Assign this role to the `AccessGuide.WebApi` identity:
  - `Trusted Identity`

## Minimal API

Create a new .NET 8.0 `ASP.NET Core Web API` project called `AccessGuide.WebApi` and remember to un-check the `Use controllers` option and to check the `Enable OpenAPI support:

If you run the application you should be able to invoke the `GET http://localhost:{port}/weatherforecast` endpoint to return a list of temperatur readings.

Add the following NuGet packages to the project:

- Shuttle.Access.AspNetCore
- Shuttle.Access.RestClient

To enable the `Shuttle.Access` authorization we need to add the following:

```c#
// var builder = WebApplication.CreateBuilder(args); <-- at some point after

builder.Services.AddAccessAuthorization();

// The client application needs to be able to retrieve session data from the Shuttle.Access.WebApi.
// This means that it too needs to be authenticated.
builder.Services.AddAccessClient(clientBuilder =>
    {
        // webApplicationBuilder.Configuration.GetSection(AccessClientOptions.SectionName).Bind(clientBuilder.Options);
        // ...with `appsettings.json` containing the following:
        //    {
        //      "Shuttle": {
        //        "Access": {
        //          "Client": {
        //            "BaseAddress": "http://localhost:5599",
        //            "IdentityName": "identity0-name",
        //            "Password": "password"
        //          }
        //        }
        //      }
        //    }   

        clientBuilder.Options.BaseAddress = "http://localhost:5599";

        clientBuilder.AddPasswordAuthenticationProvider(providerBuilder =>
        {
            // This will obtain a session for the Web API as the `AccessGuide.WebApi` identity.
            // Since `AccessGuide.WebApi` is in the `Trusted Identity` role,
            // the Web API is able to view and register sessions.
            providerBuilder.Options.IdentityName = "AccessGuide.WebApi";
            providerBuilder.Options.Password = "AccessGuide.WebApi:Password";
        });
    });
```

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

Alter the `builder.Services.AddSwaggerGen();` registration, to allow adding the token, as follows:

```c#
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(type => type.FullName);

    options.AddSecurityDefinition("Shuttle.Access", new()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Shuttle.Access",
        In = ParameterLocation.Header,
        Description = "Custom authorization header using the Shuttle.Access scheme. Example: 'Shuttle.Access token=GUID'."
    });

    options.AddSecurityRequirement(new()
    {
        {
            new()
            {
                Reference = new()
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Shuttle.Access"
                }
            },
            []
        }
    });
});
```

Use the `Shuttle.Access` [Web API](http://localhost:5599/swagger/index.html) to register a session by invoking the `POST /v1/sessions` endpoint with the following body:

```json
{
  "identityName": "guide-user",
  "password": "guide-password"
}
```

You should receive a response with the following structure:

```json
{
  "identityName": "guide-user",
  "permissions": [
    "weather://forecast/view"
  ],
  "registrationRequested": false,
  "result": "Registered",
  "token": "363f6fdd-bdd4-4db5-b18c-7a9bf6f075fc",
  "expiryDate": "2025-03-30T01:38:46.8459904+00:00",
  "sessionTokenExchangeUrl": "",
  "identityId": "c01c176f-1d96-486b-8677-ae91f2961980",
  "dateRegistered": "2025-03-29T17:38:46.8292227+00:00"
}
```

Copy the `token` and then use the to `Authorize` access to the `AccessGuide.WebApi` Swagger page by entering:

```
Shuttle.Access token={the-token-value}
```

When you invoke the `GET http://localhost:{port}/weatherforecast` endpoint now you should have access.