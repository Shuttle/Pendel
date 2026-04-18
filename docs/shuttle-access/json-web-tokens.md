# JSON Web Tokens (JWT)

Although Shuttle.Access supports identity name and password authentication, the preferred mechanism is to use JSON Web Tokens.

In order to support JWTs the relevant Web APIs would need to be configured to validate a provided token.  

The `Shuttle.Access.WebApi` may also be configured to expose `OAuth` providers to the front-end that a user may select to authenticate themselves.

## Web API configuration

Web APIs would need to reference package `Shuttle.Access.RestClient` which provides a client that can access a `Shuttle.Access.WebApi` deployment.  The `Shuttle.Access.AspNetCore` package will be added as a transient reference.

The following will add `Authorization` header authentication handlers for the `Shuttle.Access` and `Bearer` schemes:

```c#
services            
    .AddAccessAuthorization(options =>
    {
        builder.Configuration.GetSection(AccessAuthorizationOptions.SectionName).Bind(options);
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

There are two ways that the client endpoint can interact with the Shuttle.Access Web API via the REST client, depending on the `PassThrough` option value:

```c#
services
    .AddAccessAuthorization(options =>
    {
        options.PassThrough = <true|false>;
    });
```

If it is `true` then the JWT that is received will be passed through to the Shuttle.Access Web API as the `Bearer` token by calling the `GET /v1/session/self` endpont; else the client endpoint should send its own JWT `Bearer` token which is retried by calling the `POST /v1/sessions/search` endpoint to find an active session.  If it cannot find a session, then one is created by the Shuttle.Access Web API.  To retrieve a session the identity requires the `access://sessions/view` permissions, and in order to register a new session it requires the `access://sessions/register` permission.

The incoming token has to contain an identifier of sorts that will be used for the `Identity Name`.  The token will be inspected and the first of the `IdentityNameClaimTypes` that is located will be used as the identity name.

In order for the Web API to interact with the `Shuttle.Access.WebApi` the caller also has to be authenticated.  This is where the following configuration comes in:

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
       providerBuilder.Options.IdentityName = "{web-api identity name}";
       providerBuilder.Options.Password = "{web-api identity password}";
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
