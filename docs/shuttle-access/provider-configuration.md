# Provider Configuration

## GitHub

Navigate to the `Developer Settings` and then create a `New OAuth App` on the `OAuth Apps` page for your front-end application.  You will need to create an app for each front-end instance as the OAuth appl allows only a single redirect.

Once registered you can create a secret and then add the app to the `appsettings.json`:

```json
{
    "Shuttle": {
        "OAuth": {
            "Providers": [
                {
                    "Name": "GitHub",
                    "Issuer": {
                        "Uri": "https://github.com/login/oauth",
                        "JwksUri": "https://api.github.com/meta"
                    },
                    "Authorize": {
                        "Url": "https://github.com/login/oauth/authorize",
                        "ClientId": "<the-oauth-app-client-id>"
                    },
                    "Token": {
                        "Url": "https://github.com/login/oauth/access_token",
                        "ClientId": "<the-oauth-app-client-id>",
                        "ClientSecret": "<the-oauth-app-client-secret>"
                    },
                    "Data": {
                        "Url": "https://api.github.com/user",
                        "EMailPropertyName": "email",
                        "IdentityPropertyName": "email"
                    },
                    "scope": "user:email"
                },
            ]
        }
    }
}
```
