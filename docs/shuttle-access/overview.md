# Overview

The following is a brief overview of the solution.

## Database

A Sql Server database is used for the event store and projections.

In order to create the database you would need to download the relevant `efbundle` file from the `Shuttle.Access` [releases page](https://github.com/Shuttle/Shuttle.Access/releases) and then run it against your database, e.g.:

```shell
shuttle-access-efbundle-win-x64.exe --connection "Server=.;Database=Access;User ID=sa;Password=Pass!000;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;"
```

## Server

The `Shuttle.Access.Server` console application is the message proessing endpoint.

All projections are also handled by the application.

## Web API

The web API is hosted by the `Shuttle.Access.WebApi` minimal API application.

## Rest Client

The C# [Shuttle.Access.RestClient](https://www.nuget.org/packages/Shuttle.Access.RestClient) NuGet package is used to interact with the web API and has the following `appsettings.json` configuration:

```json
{
  "Shuttle": {
    "Access": {
      "Client": {
        "BaseAddress": "http://localhost:5599",
        "IdentityName": "identity0-name",
        "Password": "password"
      }
    }
  }
}
```

When securing an Asp.NET web application, this client is typically used in conjunction with the [Shuttle.Access.AspNetCore](https://www.nuget.org/packages/Shuttle.Access.AspNetCore) package.
