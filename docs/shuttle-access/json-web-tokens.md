# JSON Web Tokens (JWT)

Although Shuttle.Access supports identity name and password authentication, the preferred mechanism is to use JSON Web Tokens.

In order to support JWTs the `Shuttle.Access.WebApi` deployment has to be configured to validate a provided token.

The `Shuttle.Access.WebApi` may also be configured to expose `OAuth` providers to the front-end that a user may select to authenticate themselves.

## Issuer configuration

::: warning
Issuers are configured **only** on the `Shuttle.Access.WebApi` deployment.  It is the sole validator of issuers and tokens; applications that use Shuttle.Access forward the caller's `Authorization` header and let it do the work.  See [Sessions](/shuttle-access/sessions).

Keeping this in one place means signing keys, audiences, and clock skew are changed in a single deployment instead of being duplicated across every application that trusts it.
:::

The following is bound from the `appsettings.json` of the `Shuttle.Access.WebApi` deployment:

```json
{
  "Shuttle": {
    "Access": {
      "Authorization": {
        "Issuers": [
          {
            "Uri": "https://sts.windows.net/{tenant-id}/",
            "JwksUri": "https://login.microsoftonline.com/{tenant-id}/discovery/v2.0/keys",
            "IdentityNameClaimTypes": [ "upn", "appid" ],
            "Audiences": [],
            "ClockSkew": "00:05:00",
            "SigningKeyCacheDuration": "01:00:00"
          }
        ]
      }
    }
  }
}
```

The incoming token has to contain an identifier of sorts that will be used for the `Identity Name`.  The token will be inspected and the first of the `IdentityNameClaimTypes` that is located will be used as the identity name.  If a validated identity has no active session, one is registered on its behalf.

## Application configuration

Applications reference `Shuttle.Access.AspNetCore` to secure their own endpoints, and `Shuttle.Access.RestClient` to call a `Shuttle.Access.WebApi` deployment as themselves.  The two are independent and neither references the other, so take only what you need.

Securing endpoints needs no JWT configuration at all, and needs only the `Shuttle.Access.AspNetCore` package — the caller's `Bearer` token is forwarded to the Shuttle.Access web API, which validates it:

```c#
services            
    .AddAccessAuthorization(options =>
    {
        builder.Configuration.GetSection(AccessAuthorizationOptions.SectionName).Bind(options);

        options.BaseAddress = "http://localhost:5599";
    });
```

A JWT is only configured on the application side when the application needs to call the Shuttle.Access web API *as itself* — to register identities, read roles, or determine its own permissions.  That is what the `Shuttle.Access.RestClient` authentication providers below supply, and it is unrelated to the credential the caller presents:

```c#
services
    .AddAccessClient(options =>
    {
        options.BaseAddress = "http://localhost:5599";
    })
    .UseBearerAuthenticationProvider(providerBuilder =>
    {
        providerBuilder.Options.GetBearerAuthenticationContextAsync = async (httpRequestMessage, serviceProvider) => 
        {
            // Obtain the token and pass it back.
            // For example, here is a simple Azure token retrieval using package `Azure.Identity`.
            var credential = new DefaultAzureCredential();
            var scope = "https://management.azure.com/.default";
            var token = await credential.GetTokenAsync(new TokenRequestContext(new[] { scope }));

            return new BearerAuthenticationContext(token.Token);
        };
    })
    .UsePasswordAuthenticationProvider(providerBuilder =>
    {
       builder.Configuration.GetSection(PasswordAuthenticationInterceptorOptions.SectionName).Bind(providerBuilder.Options);
    });
```

## OAuth configuration

The `OAuth` providers are configured in the `appsettings.json` of the `Shuttle.Access.WebApi` deployment:

```json
{
  "Shuttle": {
    "OAuth": {
      "DefaultRedirectUri": "http://localhost:3000/oauth",
      "Providers": [
        {
          "Name": "GitHub",
          "Authorize": {
            "ClientId": "{client-id}",
            "Url": "https://github.com/login/oauth/authorize"
          },
          "Token": {
            "ClientId": "{client-id}",
            "ClientSecret": "{client-secret}",
            "Url": "https://github.com/login/oauth/access_token"
          },
          "Data": {
            "Url": "https://api.github.com/user"
          },
          "scope": "user:email"
        },
        {
          "Name": "Microsoft",
          "Authorize": {
            "ClientId": "{client-id}",
            "Url": "https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/authorize",
            "CodeChallengeMethod": "S256"
          },
          "Token": {
            "ClientId": "{client-id}",
            "Url": "https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token",
            "ContentTypeHeader": "application/x-www-form-urlencoded",
            "OriginHeader": "http://localhost:3000"
          },
          "Data": {
            "Url": "https://graph.microsoft.com/v1.0/me",
            "AuthorizationHeaderScheme": "Bearer",
            "EMailPropertyName": "mail"
          },
          "Scope": "User.Read"
        }
      ]
    }
  }
}
```

This is a generic `OAuth` mechanism implemented by the [Shuttle.OAuth](https://github.com/Shuttle/Shuttle.OAuth) package.
