# Sessions

There are two questions an application can ask Shuttle.Access, and the difference between them is **whose credential
the call carries**.  Each has its own package, and neither references the other:

|                                   | "Who is calling me?"                          | "Who am *I*, and what may I do?"                |
| --------------------------------- | --------------------------------------------- | ----------------------------------------------- |
| Package                            | `Shuttle.Access.AspNetCore`                   | `Shuttle.Access.RestClient`                     |
| Direction                          | inbound                                       | outbound                                        |
| Credential used                    | the caller's, forwarded as-is                 | this application's own identity                 |
| Endpoint(s) called                 | `GET /v1/sessions/self`                       | the whole `IAccessClient`                       |
| Authorized against                 | the caller's permissions                      | this application's permissions                  |
| Entry point                        | `ISessionContext` (populated for you)         | `IAccessClient`                                 |
| Needs an incoming HTTP request     | yes                                           | no                                              |
| Needs an authentication provider   | no                                            | **yes**                                         |
| Used by                            | web API                                       | web API **and** console                         |

A web API that does both registers both.  Giving your application an identity of its own never changes how callers are
authorized, because the caller's session is always resolved from the forwarded header.

## Shuttle.Access is the only validator

No application other than the Shuttle.Access web API validates a credential.  There is no issuer configuration, no
signing key handling, and no token parsing in your application — `Shuttle.Access.AspNetCore` forwards the caller's
`Authorization` header to `GET /v1/sessions/self` and Shuttle.Access returns the resulting session.

This is deliberate.  If every application validated tokens itself, every deployment would need its own copy of the
issuer configuration, signing keys, and clock skew settings, and they would drift.  Centralising validation in the
Shuttle.Access web API means security configuration is changed in exactly one place.

::: tip
`Shuttle.Access.WebApi` is the exception, because it *is* the authority.  It replaces the default `ISessionResolver`
with its own via `UseSessionResolver<AccessSessionResolver>()`, which is the only implementation that reads
[issuer configuration](/shuttle-access/json-web-tokens) and validates session tokens.  No other deployment should do
this.
:::

## Securing your endpoints

`Shuttle.Access.AspNetCore` is sufficient on its own — securing endpoints does not need the REST client:

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

The resolved session is placed on the `ISessionContext` for the duration of the request, which is what
`RequirePermission`, `RequireSession`, and `ISessionContext.HasPermission(...)` read.

Because the credential belongs to the caller rather than to your application, `GET /v1/sessions/self` is the only
endpoint that may legitimately be called with it.  Any other call would be authorized against the *caller's*
permissions rather than your application's, which is almost never the intent — which is why the forwarded credential
never reaches the REST client.

## Calling Shuttle.Access as yourself

`Shuttle.Access.RestClient` always calls the web API under your application's own identity, so an authentication
provider is required — without one there would be no credential to send:

```c#
builder.Services
    .AddAccessClient(options =>
    {
        builder.Configuration.GetSection(AccessClientOptions.SectionName).Bind(options);
    })
    .UsePasswordAuthenticationProvider(providerBuilder =>
    {
        builder.Configuration.GetSection(PasswordAuthenticationInterceptorOptions.SectionName).Bind(providerBuilder.Options);
    });
```

To discover what your own identity may do, ask for its session.  `HasPermission` is available directly on the
returned contract, so there is nothing to map:

```c#
var response = await accessClient.Sessions.GetSelfAsync(cancellationToken);

if (response is { IsSuccessStatusCode: true, Content: not null } &&
    response.Content.HasPermission(tenantId, AccessPermissions.Identities.Register))
{
    await accessClient.Identities.PostAsync(registerIdentity, cancellationToken);
}
```

Every `IAccessClient` endpoint is available, each authorized against the permissions assigned to your application's
identity.  Omitting the authentication provider fails the host at startup rather than on the first outbound call.  See
the [Rest Client](/shuttle-access/rest-client) page for the available providers.

## Console applications

`Shuttle.Access.RestClient` depends on nothing but the web API contracts and needs no incoming request, so a console
application uses exactly the registration above.  `AddAccessAuthorization()` plays no part — there is no caller to
authorize.

::: tip Upgrading from 11.0.6 or earlier
The `AccessAuthorizationOptions.PassThrough` boolean is gone, along with all credential validation outside the
Shuttle.Access web API.  Forwarding the caller's header is now the only behaviour, so `PassThrough = true` needs no
configuration at all; applications that used `PassThrough = false` should remove their `Issuers` configuration.

`ISessionService` has been removed.  Resolving the caller's session is handled entirely within
`Shuttle.Access.AspNetCore` and needs no service call; for your *own* identity call
`IAccessClient.Sessions.GetSelfAsync()` and use `HasPermission` on the returned contract.

`Shuttle.Access.RestClient` now depends only on `Shuttle.Access.WebApi.Contracts` — it no longer references
`Shuttle.Access.AspNetCore` or `Shuttle.Access`, and no longer carries an ASP.NET framework reference.  It requires an
authentication provider.  `AccessAuthorizationOptions.BaseAddress` is new — set it to the address of the
Shuttle.Access web API.
:::
