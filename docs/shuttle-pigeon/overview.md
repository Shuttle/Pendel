# Overview

The following is a brief overview of the solution.

## Database

A Sql Server database is required.

In order to create the database you would need to download the relevant `efbundle` file from the `Shuttle.Pigeon` [releases page](https://github.com/Shuttle/Shuttle.Pigeon/releases) and then run it against your database, e.g.:

```shell
shuttle-pigeon-efbundle-win-x64.exe --connection "Server=.;Database=Pigeon;User ID=sa;Password=Pass!000;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;"
```

## Server

The `Shuttle.Pigeon.Server` console application is the message proessing endpoint.

All projections are also handled by the application.

## Web API

The web API is hosted by the `Shuttle.Pigeon.WebApi` minimal API application.

## Rest Client

The C# [Shuttle.Pigeon.RestClient](https://www.nuget.org/packages/Shuttle.Pigeon.RestClient) NuGet package is used to interact with the web API and has the following `appsettings.json` configuration:

```json
{
  "Shuttle": {
    "Pigeon": {
      "Client": {
        "BaseAddress": "http://localhost:5268",
      }
    }
  }
}
```