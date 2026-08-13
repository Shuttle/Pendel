# Shuttle.Access

An identity and access management system that provides fine-grained permissions in a session-based environment.  Identities may sign in using a name and password, or using a generic OAuth mechanism.

There is a web-based management front-end, written using Vue, as well as a restful web-api.  A rest client library is also available to facilitate calls to the web-api.

Once an identity obtains a session token it is passed in the `Authorization` header using the `Shuttle.Access` scheme, or a JSON Web Token is passed using the `Bearer` scheme:

``` http
Authorization: Shuttle.Access token={GUID}
Authorization: Bearer {jwt}
```

## Securing an endpoint

Add the [Shuttle.Access.AspNetCore](https://www.nuget.org/packages/Shuttle.Access.AspNetCore) package and register the authorization:

```c#
builder.Services
    .AddAccessAuthorization(options =>
    {
        builder.Configuration.GetSection(AccessAuthorizationOptions.SectionName).Bind(options);

        options.BaseAddress = "http://localhost:5599";   // the Shuttle.Access web API
    });

// ...

app.UseAccessAuthorization();
```

There is nothing further to configure.  Your application does not inspect the credential it receives — it forwards the caller's `Authorization` header to the Shuttle.Access web API, which is the only place issuers and tokens are validated.  To also call the web API *as your own application*, add [Shuttle.Access.RestClient](https://www.nuget.org/packages/Shuttle.Access.RestClient) — see [Sessions](/shuttle-access/sessions).

## Applying requirements

Minimal API endpoints may be secured using either `RequirePermission` or `RequireSession`:

```c#
app.MapGet("/v1/customers", () =>
    {
        // For a specific permission use `RequirePermission`.
    })
    .RequirePermission("crm://customers/view");

app.MapGet("/v1/customers/{id:guid}", (Guid id) =>
    {
        // If you don't require a specific permission,
        // but a session has to exist, use `RequireSession`.
    })
    .RequireSession();
```

If you are using controllers, then apply the relevant attribute:

```c#
[HttpGet]
[RequirePermission("weather://forecast/get")]
public IEnumerable<WeatherForecast> Get()
{
    // For a specific permission use `RequirePermission`.
}

[HttpGet("{id:guid}")]
[RequireSession]
public WeatherForecast Get(Guid id)
{
    // If you don't require a specific permission,
    // but a session has to exist, use `RequireSession`.
}
```

A request with no session yields a `401 Unauthorized` response, while a session that lacks the required permission yields a `403 Forbidden` response.

However, if you need to check a permission in code, inject the `ISessionContext`.  It is populated during authentication and carries the resolved session, tenant, and permissions:

```c#
app.MapGet("/v1/categories", (ISessionContext sessionContext) =>
{
    if (!sessionContext.HasPermission("pim://categories/review"))
    {
        return Results.Forbid();
    }

    return Results.Ok();
});
```

## Structure

```
.
├─ Permissions
│  ├─ *
│  ├─ system://context/read
│  └─ system://context/write
├─ Roles
│  ├─ Administrator
│  │  └─ Permissions
│  │     └─ *
│  ├─ Reader
│  │  └─ Permissions
│  │     └─ system://context/read
│  └─ Owner
│     └─ Permissions
│        ├─ system://context/read
│        └─ system://context/write
└─ Identity
   ├─ admin
   │  └─ Roles
   │     └─ Administrator
   ├─ someone@domain.com
   │  └─ Roles
   │     └─ Reader
   └─ mrresistor@example.co.za
      └─ Roles
         └─ Owner
```
