# Guide

This guid assumes that you are either running the [Shuttle.Access](https://github.com/Shuttle/Shuttle.Access) solution or the [docker-compose](/shuttle-access/docker) containers.

## Access

Navigate to the [front-end](http://localhost:3000) and log in using an identity that has `Administrator` privileges.

Create the following entities:-

- These identities:
  - `guide-user` with a password of `guide-password`
  - `AccessGuide.WebApi` with a password of `AccessGuide.WebApi:Password`
- A permission called `weather://forecast/view`
- A role called `Trusted Identity` and assign the following permissions:
  - `access://sessions/view`
  - `access://sessions/register`
- A role called `Weather Reader` and assign the `weather://forecast/view` permission.
- Assign the following roles to the `guide-user` identity:
  - `Weather Reader`
  - `Trusted Identity` (we just need this to get to the session token later on)
- Assign the `Trusted Identity` role to the `AccessGuide.WebApi` identity.

## Minimal API

Create a new .NET 8.0 `ASP.NET Core Web API` project called `AccessGuide.WebApi` and remember to un-check the `Use controllers` option and to check the `Enabled OpenAPI support:

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
builder.Services.AddAccessClient(builder =>
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
        clientBuilder.Options.IdentityName = "AccessGuide.WebApi";
        clientBuilder.Options.Password = "AccessGuide.WebApi:Password";
    })
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

Use the `Shuttle.Access` [front-end](http://localhost:3000/signin) to sign in using the `guide-user` identity and the navigate to the [sessions](http://localhost:3000/signin) view.

Copy the `Token` and then use the to `Authorize` access to the `AccessGuide.WebApi` Swagger page by entering:

```
Shuttle.Access token={the-token}
```

When you invoke the `GET http://localhost:{port}/weatherforecast` endpoint now you should have access.