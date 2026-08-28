# Configuration

All Shuttle.Access-specific settings live under `Shuttle:Access` in `appsettings.json`. JWT issuer and OAuth provider
configuration have their own page — see [JSON Web Tokens](/shuttle-access/json-web-tokens) — and the
[Consistency](/shuttle-access/consistency) page covers `Shuttle:Recall:EventProcessing:ImmediateConsistency` in
detail. This page covers everything else.

Connection strings (`ConnectionStrings:Access`, `ConnectionStrings:azure`) and `Shuttle:Hopper` (queue transports and
message routes — see the [Docker](/shuttle-access/docker) and [Docker Compose](/shuttle-access/docker-compose) guides
for example values) follow standard `Shuttle.Hopper` configuration.

## `Shuttle:Access` — shared

Bound by `AccessOptions`, used by both `Shuttle.Access.WebApi` and `Shuttle.Access.Server`.

| Property | Default | Description |
| --- | --- | --- |
| `SystemTenantId` | `c3ee3908-716b-48df-abda-33b49e09be97` | Id of the built-in system tenant |
| `SystemTenantName` | `System` | Name of the built-in system tenant |
| `SystemAdministratorIdentityName` | `shuttle-admin` | Identity name seeded on first run |
| `SystemAdministratorPassword` | `shuttle-admin` | Password seeded on first run — **change this** |
| `SessionDuration` | `08:00:00` | How long a session is valid for once registered |
| `SessionRenewalTolerance` | `00:15:00` | Window before expiry within which a session is renewed rather than re-issued |

## `Shuttle:Access:Api` — `Shuttle.Access.WebApi`

Bound by `ApiOptions`.

| Property | Default | Description |
| --- | --- | --- |
| `AllowPasswordAuthentication` | `true` | Whether `POST /v1/sessions` accepts an identity name/password body |
| `OAuthRegisterUnknownIdentities` | `true` | Whether a successful OAuth sign-in registers a new identity when none exists |
| `ExtensionFolder` | `./.extension` | Folder Shuttle.Access.WebApi looks in for OAuth provider SVG icons (`{ExtensionFolder}/OAuth/{provider}.svg`) |

## `Shuttle:Access:Authorization`

This one section is bound by two different option classes, depending on which package reads it:

- `Shuttle.Access.AspNetCore`'s `AccessAuthorizationOptions` — used by **every** application, including the web API
  itself, to secure its own endpoints (see [Securing an endpoint](/shuttle-access/home#securing-an-endpoint)).
- `Shuttle.Access.WebApi`'s `AccessAuthenticationOptions` — used **only** by the web API, because it is the sole
  deployment that validates issuers and tokens (see [Sessions](/shuttle-access/sessions)).

The properties each binds are disjoint, so a single section safely serves both:

| Property | Bound by | Default | Description |
| --- | --- | --- | --- |
| `BaseAddress` | every app except `Shuttle.Access.WebApi` | *(empty)* | Address of the `Shuttle.Access.WebApi` deployment that resolves the caller's session |
| `Realm` | every app | `API` | Realm reported on a `401` challenge |
| `InsecureModeEnabled` | `Shuttle.Access.WebApi` only | `false` | Bypasses signature validation — never enable in production |
| `Issuers` | `Shuttle.Access.WebApi` only | `[]` | Accepted JWT issuers — see [JSON Web Tokens](/shuttle-access/json-web-tokens) |

## `Shuttle:Access:Server` — `Shuttle.Access.Server`

Bound by `ServerOptions`.

| Property | Default | Description |
| --- | --- | --- |
| `MonitorKeepAliveInterval` | `00:00:15` | Interval at which the server's keep-alive heartbeat runs |
| `Timeout` | `00:02:00` | Keep-alive timeout before the server is considered unresponsive |

## `Shuttle:Access:SqlServer`

Bound by `AccessSqlServerOptions`.

| Property | Default | Description |
| --- | --- | --- |
| `ConnectionString` | *(empty)* | Overrides `ConnectionStrings:Access` when set |
| `CommandTimeout` | `00:00:30` | SQL command timeout |

## `Shuttle:Access:Client` — `Shuttle.Access.RestClient`

Bound by `AccessClientOptions`. Used by any application that calls `Shuttle.Access.WebApi` as itself — see
[Calling Shuttle.Access as yourself](/shuttle-access/sessions#calling-shuttle-access-as-yourself).

| Property | Default | Description |
| --- | --- | --- |
| `BaseAddress` | *(empty)* | Address of the `Shuttle.Access.WebApi` deployment to call |
| `RenewToleranceTimeSpan` | `00:05:00` | Window before session expiry within which the client renews it |

### `Shuttle:Access:Client:PasswordAuthenticationInterceptor`

Bound by `PasswordAuthenticationInterceptorOptions`, when using `UsePasswordAuthenticationProvider(...)`.

| Property | Default | Description |
| --- | --- | --- |
| `IdentityName` | *(empty)* | Identity used to authenticate this application as itself |
| `Password` | *(empty)* | Password for `IdentityName` |
| `TenantId` | *(none)* | Tenant to authenticate against, if not the system tenant |

## Putting it together

A minimal `Shuttle.Access.WebApi` configuration, combining several of the sections above with the consistency toggle
and connection strings:

```json
{
  "ConnectionStrings": {
    "Access": "server=database;database=Access;user id=sa;password=Pass!000;TrustServerCertificate=true",
    "azure": "UseDevelopmentStorage=true;DevelopmentStorageProxyUri=http://azurite"
  },
  "Shuttle": {
    "Access": {
      "Api": {
        "AllowPasswordAuthentication": true,
        "OAuthRegisterUnknownIdentities": true
      }
    },
    "Recall": {
      "EventProcessing": {
        "ImmediateConsistency": {
          "Enabled": true
        }
      }
    }
  }
}
```

See the [Docker](/shuttle-access/docker) and [Docker Compose](/shuttle-access/docker-compose) guides for full,
runnable `server-appsettings.json`/`webapi-appsettings.json` examples.
