# Overview

The following is a brief overview of the solution.

## Database

A Sql Server database is used for the event store and projections and may be deployed using the [SqlPackage](https://learn.microsoft.com/en-us/sql/tools/sqlpackage/sqlpackage?view=sql-server-ver16) command-line utility to apply the `dacpac` that is produced when compiling the [Shuttle.Access.Database](https://github.com/Shuttle/Shuttle.Access/tree/master/Shuttle.Access.Database) project which is part of the [Shuttle.Access](https://github.com/Shuttle/Shuttle.Access/tree/master) solution.

## Server

The `Shuttle.Access.Server` console application is the message proessing endpoint.

All projections are also handled by the application.

## Web API

A the web API is hosted by the `Shuttle.Access.WebApi` minimal API application.

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