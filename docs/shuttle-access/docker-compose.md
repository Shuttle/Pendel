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

<<< @/shuttle-access/snippets/server-appsettings.json{json}

And we also need a `webapi-appsettings.json` file:

<<< @/shuttle-access/snippets/webapi-appsettings.json{json}

You will now be able to run `docker-compose up` in the folder containing the above file:

```
> docker-compose up
```

The various images will be downloaded and, once all the containers have started up, you can browse to the [front-end](http://localhost:3000):

```
http://localhost:3000
```

Which should bring you to the sign-in page where `shuttle-admin` is the identity as well as the password.

To view the web-api endpoints you can browse to the [swagger page](http://localhost:5599/swagger/index.html):

```
http://localhost:5599/swagger/index.html
```