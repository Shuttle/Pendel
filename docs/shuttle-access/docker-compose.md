---
aside: false
---

# Getting Started

The quickest way to get started is to install [Docker](https://www.docker.com/get-started/).

We then need a specific folder, e.g. `c:\development.docker\access`, in which we can then create a `docker-compose.yml` file that contains the following content:

```
services:
    azurite:
        image: mcr.microsoft.com/azure-storage/azurite
        hostname: azurite
    database:
        image: shuttle/access-sqlserver-linux:latest
        hostname: database
        ports:
            - "2433:1433"
    server:
        image:
            shuttle/access-server:latest
        environment:
            - CONFIGURATION_FOLDER=.
        depends_on:
            - "azurite"
            - "database"
        volumes:
            - type: bind
              source: ./server-appsettings.json
              target: /opt/shuttle.access.server/appsettings.json
    web-api:
        image:
            shuttle/access-webapi:latest
        environment:
            - ASPNETCORE_URLS=http://*:5599
            - CONFIGURATION_FOLDER=.
        depends_on:
            - "azurite"
            - "server"
        ports:
            - "5599:5599"
        volumes:
            - type: bind
              source: ./webapi-appsettings.json
              target: /opt/shuttle.access.webapi/appsettings.json
    front-end:
        image:
            shuttle/access-vue:latest
        environment:
           - VITE_API_URL=http://localhost:5599
           - VITE_API_ALLOW_PASSWORD_AUTHENTICATION=true
        ports:
            - "3000:80"
```

You will also notice some bindings to the following files:-

First, we need `server-appsettings.json` file:

```json
{
  "Serilog": {
    "Using": [
      "Serilog.Sinks.Console",
      "Serilog.Sinks.File"
    ],
    "MinimumLevel": {
      "Default": "Debug",
      "Override": {
        "System.Net.Http": "Error"
      }
    },
    "WriteTo": [
      {
        "Name": "Console"
      },
      {
        "Name": "File",
        "Args": {
          "path": "./logs/.log",
          "rollOnFileSizeLimit": true,
          "retainedFileCountLimit": 30,
          "fileSizeLimitBytes": 1048576,
          "rollingInterval": "Day"
        }
      }
    ]
  },
  "ConnectionStrings": {
    "Access": "Data Source=database;Initial Catalog=Access;user id=sa;password=Pass!000;TrustServerCertificate=true",
    "azure": "UseDevelopmentStorage=true;DevelopmentStorageProxyUri=http://azurite"
  },
  "Shuttle": {
    "ServiceBus": {
      "Inbox": {
        "WorkQueueUri": "azuresq://azure/access-server-inbox-work",
        "DeferredQueueUri": "azuresq://azure/access-server-inbox-deferred",
        "ErrorQueueUri": "azuresq://azure/access-error",
        "MaximumFailureCount": 8,
        "ThreadCount": 1,
        "DurationToIgnoreOnFailure": [
          "00:00:01",
          "00:00:01",
          "00:00:01",
          "00:00:01",
          "00:00:01",
          "00:00:05",
          "00:00:10",
          "00:00:30"
        ]
      }
    }
  }
}
```

And we also need a `webapi-appsettings.json` file:

```json
{
  "Serilog": {
    "Using": [
      "Serilog.Sinks.Console",
      "Serilog.Sinks.File"
    ],
    "MinimumLevel": {
      "Default": "Debug",
      "Override": {
        "System.Net.Http": "Error"
      }
    },
    "WriteTo": [
      {
        "Name": "Console"
      },
      {
        "Name": "File",
        "Args": {
          "path": "./logs/.log",
          "rollOnFileSizeLimit": true,
          "retainedFileCountLimit": 30,
          "fileSizeLimitBytes": 1048576,
          "rollingInterval": "Day"
        }
      }
    ]
  },
  "ConnectionStrings": {
    "azure": "UseDevelopmentStorage=true;DevelopmentStorageProxyUri=http://azurite",
    "Access": "Data Source=database;Initial Catalog=Access;user id=sa;password=Pass!000;TrustServerCertificate=true"
  },
  "Shuttle": {
    "Access": {
      "KnownApplications": [
        {
          "Name": "Recall",
          "Title": "Shuttle.Recall.WebApi",
          "Description": "Provides endpoints that allow retrieving primitive events from a Sql Server event store.",
          "SessionTokenExchangeUrl": "http://localhost:3001/session/"
        }
      ]
    },
    "OAuth": {
      "DefaultRedirectUri": "http://localhost:3000/oauth",
      "Providers": [
        {
          "Name": "GitHub",
          "Authorize": {
            "ClientId": "your-client-id",
            "Url": "https://github.com/login/oauth/authorize"
          },
          "Token": {
            "ClientId": "your-client-id",
            "ClientSecret": "your-client-secret",
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
            "ClientId": "your-client-id",
            "CodeChallengeMethod": "S256"
          },
          "Token": {
            "ClientId": "your-client-id",
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
    },
    "ServiceBus": {
      "Inbox": {
        "WorkQueueUri": "azuresq://azure/access-webapi-inbox-work",
        "DeferredQueueUri": "azuresq://azure/access-webapi-inbox-deferred",
        "ErrorQueueUri": "azuresq://azure/shuttle-error",
        "ThreadCount": 1,
        "DurationToIgnoreOnFailure": [
          "00:00:05",
          "00:00:10",
          "00:00:30"
        ]
      },
      "MessageRoutes": [
        {
          "Uri": "azuresq://azure/access-server-inbox-work",
          "Specifications": [
            {
              "Name": "StartsWith",
              "Value": "Shuttle.Access.Messages"
            }
          ]
        }
      ]
    }
  }
}
```

You will now be able to run `docker-compose up` in the folder containing the above file:

```
> docker-compose up
```

The various images will be downloaded and, once all the containers have started up, you can browse to the [front-end](http://locahost:3000):

```
http://locahost:3000
```

Which should bring you to the sign-in page where `admin` is the identity as well as the password.

To view the web-api endpoints you can browse to the [swagger page](http://locahost:5599/swagger/index.html):

```
http://locahost:5599/swagger/index.html
```