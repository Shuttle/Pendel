# Getting Started

The quickest way to get started is to install [Docker](https://www.docker.com/get-started/).

We then need a specific folder, e.g. `c:\development.docker\pigeon`, in which we can then create a `docker-compose.yml` file that contains the following content:

```
services:
    azurite:
        image: mcr.microsoft.com/azure-storage/azurite
        hostname: azurite
    database:
        image: shuttle/pigeon-sqlserver-linux:latest
        hostname: database
        ports:
            - "2433:1433"
    server:
        image:
            shuttle/pigeon-server:latest
        environment:
            - CONFIGURATION_FOLDER=.
        depends_on:
            - "azurite"
            - "database"
        volumes:
            - type: bind
              source: ./server-appsettings.json
              target: /opt/shuttle.pigeon.server/appsettings.json
    web-api:
        image:
            shuttle/pigeon-webapi:latest
        environment:
            - ASPNETCORE_URLS=http://*:5268
            - CONFIGURATION_FOLDER=.
        depends_on:
            - "azurite"
            - "server"
        ports:
            - "5269:5268"
        volumes:
            - type: bind
              source: ./webapi-appsettings.json
              target: /opt/shuttle.pigeon.webapi/appsettings.json
```

You will also notice some bindings to the following files:-

First, we need `server-appsettings.json` file:

<<< @/shuttle-pigeon/snippets/server-appsettings.json{json}

You will need to remove the `Shuttle:Pigeon:{sender}` configuration sections that you will not be using, and populate the relevant details on the active one(s).

And we also need a `webapi-appsettings.json` file:

<<< @/shuttle-pigeon/snippets/webapi-appsettings.json{json}

You will now be able to run `docker-compose up` in the folder containing the above file:

```
> docker-compose up
```

To view the web-api endpoints you can browse to the [swagger page](http://localhost:5268/swagger/index.html):

```
http://localhost:5268/swagger/index.html
```
