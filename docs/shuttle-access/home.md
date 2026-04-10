# Shuttle.Access

An identity and access management system that provides fine-grained permissions in a session-based environment.  Identities may sign in using a name and password, or using a generic OAuth mechanism.

There is a web-based management front-end, written using Vue, as well as a restful web-api.  A rest client library is also available to facilitate calls to the web-api.

Once an identity obtains a session token it is passed in the `Authorization` header using the `Shuttle.Access` scheme:

``` http
Authorization: Shuttle.Access token={GUID}
```

Minimal API endpoints may be secured using either `RequiresPermission` or `RequiresSession`:

```c#
app.MapGet("/v1/customers/", async () =>
    {
        // For a specific permission use `RequiresPermission`.
    })
    .RequiresPermission("crm://customers/view");

app.MapGet("/v1/customers/", async () =>
    {
        // If you don't require a specific permission,
        // but a session has to exist, use `RequiresSession`.
    })
    .RequiresSession();
```

If you are using controllers, then apply the relevant attribute:

```c#
[HttpGet]
[RequiresPermission("weather://forecast/get")]
public IEnumerable<WeatherForecast> Get()
{
    // For a specific permission use `RequiresPermission`.
}

[HttpGet]
[RequiresSession()]
public IEnumerable<WeatherForecast> Get()
{
    // If you don't require a specific permission,
    // but a session has to exist, use `RequiresSession`.
}
```

However, if you need to check whether a particular session has a permission in code, you can use the relevant `IAccessService` implementation:

```c#
app.MapGet("/v1/customers/", async (HttpContext httpContext, IAccessService accessService) =>
    {
        // First get the session token.
        var sessionTokenResult = httpContext.GetAccessSessionToken();

        // If a session token could be located, check the permission
        if (!sessionTokenResult.Ok || !await accessService.HasPermissionAsync(sessionTokenResult.SessionToken, "pim://category/review"))
        {
            return Results.Unauthorized();
        }        
    })
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
