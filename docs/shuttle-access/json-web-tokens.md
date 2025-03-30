# JSON Web Tokens (JWT)

Although Shuttle.Access supports identity name and password authentication, the preferred mechanism is to use JSON Web Tokens.

In order to support JWTs the relevant Web APIs would need to be configured to validate a provided token.  

The `Shuttle.Access.WebApi` may also be configured to expose `OAuth` providers to the front-end that a user may select to authenticate themselves.

## Web API configuration

Web APIs would need to reference package `Shuttle.Access.RestClient` which provides a client that can access a `Shuttle.Access.WebApi` deployment.  The `Shuttle.Access.AspNetCore` package will be added as a transient reference.

The following will add `Authorization` header authentication handlers for the `Shuttle.Access` and `Bearer` schemes:

```c#
services            
    .AddAccessAuthorization(builder =>
    {
        webApplicationBuilder.Configuration.GetSection($"{AccessAuthorizationOptions.SectionName}").Bind(builder.Options);
    });
```

This will bind the following to the options:

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

Whenever the Web API receives an `Authorization` header for the supported schemes, it retrieves the session from the `Shuttle.Access.WebApi` sessions endpoint (`POST /v1/session/search`).  If it cannot find a session, then one is created.  To retrieve a session the identity requires the `access://sessions/view` permissions, and in order to register a new session it requires the `access://sessions/register` permission.

The incoming token has to contain an identifier of sorts that will be used for the `Identity Name`.  The token will be inspected and the first of the `IdentityNameClaimTypes` that is located will be used as the identity name.

In order for the Web API to interact with the `Shuttle.Access.WebApi` the caller also has to be authenticated.  This is where the following configuration comes in:

```c#
service
    .AddAccessClient(builder =>
    {
        builder.Options.BaseAddress = "http://localhost:5599";

        // JWT `Bearer` preferred.
        builder.AddBearerAuthenticationProvider(providerBuilder =>
        {
            providerBuilder.Options.GetTokenAsync = async (httpRequestMessage, serviceProvider) => 
            {
                // Obtain the token and pass it back.
                // For example, here is a simple Azure token retrieval using package `Azure.Identity`.
                var credential = new DefaultAzureCredential();
                string scope = "https://management.azure.com/.default";
                AccessToken token = await credential.GetTokenAsync(new TokenRequestContext(new[] { scope }));
                return token.Token.
            };
        });

        // Simple identity name/password.
        builder.AddPasswordAuthenticationProvider(providerBuilder =>
        {
           providerBuilder.Options.IdentityName = "{web-api identity name}";
           providerBuilder.Options.Password = "{web-api identity password}";
        });
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
            "clientId": "{client-id}",
            "Url": "https://github.com/login/oauth/authorize"
          },
          "Token": {
            "clientId": "{client-id}",
            "clientSecret": "{client-secret}",
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
            "clientId": "{client-id}",
            "Url": "https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/authorize",
            "CodeChallengeMethod": "S256"
          },
          "Token": {
            "clientId": "{client-id}",
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