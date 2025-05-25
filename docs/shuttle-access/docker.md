# Running locally

You may want to host Shuttle.Access locally on a more permanent basis, and without making use of `docker-compose`.

The container below all make use of the `development` network.  If you'd like to use the below command as-is you can create the network using the following:

```cmd
docker network create development
```

## Database

If you do not have a Sql Server instance available you can use the following to create a local docker instance:

(replace `<local-sql-data-folder>` with a local folder where you'd like you sql data to be stored; else remove the volume mapping)

::: code-group
```cmd [cmd]
docker run ^
  --network development ^
  --restart always ^
  -e "ACCEPT_EULA=Y" ^
  -e "MSSQL_SA_PASSWORD=Pass!000" ^
  -p 1433:1433 ^
  --name sql ^
  --hostname sql ^
  -v <local-sql-data-folder>:/var/opt/mssql/data ^
  -d mcr.microsoft.com/mssql/server:2022-latest
```
```ps [ps]
docker run `
  --network development `
  --restart always `
  -e "ACCEPT_EULA=Y" `
  -e "MSSQL_SA_PASSWORD=Pass!000" `
  -p 1433:1433 `
  --name sql `
  --hostname sql `
  -v <local-sql-data-folder>:/var/opt/mssql/data `
  -d mcr.microsoft.com/mssql/server:2022-latest
```
```bash [bash]
docker run \
  --network development \
  --restart always \
  -e "ACCEPT_EULA=Y" \
  -e "MSSQL_SA_PASSWORD=Pass!000" \
  -p 1433:1433 \
  --name sql \
  --hostname sql \
  -v <local-sql-data-folder>:/var/opt/mssql/data \
  -d mcr.microsoft.com/mssql/server:2022-latest
```
:::

In order to populate the database you would need to get the relevant `efbundle` file from the `Shuttle.Access` [releases page](https://github.com/Shuttle/Shuttle.Access/releases) and then run it against your database, e.g.:

```cmd
shuttle-access-efbundle-win-x64.exe --connection "Server=.;Database=Access;User ID=sa;Password=Pass!000;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;"
```

## Azurite

The server makes use of Azure Storage Queues for messaging.  You can use the following to create a local [Azurite](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite):

(replace `<local-azurite-folder` with a local folder where you'd like your azurite data stored; else you could remove the volume mapping)

::: code-group
```cmd [cmd]
docker run -d ^
  --network development ^
  --name azurite ^
  --hostname azurite ^
  -p 10000:10000 ^
  -p 10001:10001 ^
  -v <local-azurite-folder>:/data ^
  mcr.microsoft.com/azure-storage/azurite
```
```ps [ps]
docker run -d `
  --network development `
  --name azurite `
  --hostname azurite `
  -p 10000:10000 `
  -p 10001:10001 `
  -v <local-azurite-folder>:/data `
  mcr.microsoft.com/azure-storage/azurite
```
```bash [bash]
docker run -d \
  --network development \
  --name azurite \
  --hostname azurite \
  -p 10000:10000 \
  -p 10001:10001 \
  -v <local-azurite-folder>:/data \
  mcr.microsoft.com/azure-storage/azurite
```
:::

## Server

Create a `server-appsettings.json` file with the following contents:

<<< @/shuttle-access/snippets/server-appsettings.json{json}

You can now create the server instance by changing the `<settings-folder>` to the relevant directory:

::: code-group
```cmd [cmd]
docker run ^
  --network development ^
  --restart always ^
  -e "CONFIGURATION_FOLDER=." ^
  --name access-server ^
  --hostname access-server ^
  -v <settings-folder>\server-appsettings.json:/opt/shuttle.access.server/appsettings.json ^
  -d shuttle/access-server:latest
```
```ps [ps]
docker run `
  --network development `
  --restart always `
  -e "CONFIGURATION_FOLDER=." `
  --name access-server `
  --hostname access-server `
  -v <settings-folder>\server-appsettings.json:/opt/shuttle.access.server/appsettings.json `
  -d shuttle/access-server:latest
```
```bash [bash]
docker run \
  --network development \
  --restart always \
  -e "CONFIGURATION_FOLDER=." \
  --name access-server \
  --hostname access-server \
  -v <settings-folder>\server-appsettings.json:/opt/shuttle.access.server/appsettings.json \
  -d shuttle/access-server:latest
```
:::

## Web API

Create a `webapi-appsettings.json` file with the following contents:

<<< @/shuttle-access/snippets/webapi-appsettings.json{json}

You can now create the web API instance by changing the `<settings-folder>` to the relevant directory:

::: code-group
```cmd [cmd]
docker run ^
  --network development ^
  --restart always ^
  -e "CONFIGURATION_FOLDER=." ^
  -p 5599:8080 ^
  --name access-webapi ^
  --hostname access-webapi ^
  -v <setting-folder>\webapi-appsettings.json:/opt/shuttle.access.webapi/appsettings.json ^
  -d shuttle/access-webapi:latest
```
```ps [ps]
docker run `
  --network development `
  --restart always `
  -e "CONFIGURATION_FOLDER=." `
  -p 5599:8080 `
  --name access-webapi `
  --hostname access-webapi `
  -v <setting-folder>\webapi-appsettings.json:/opt/shuttle.access.webapi/appsettings.json `
  -d shuttle/access-webapi:latest
```
```bash [bash]
docker run \
  --network development \
  --restart always \
  -e "CONFIGURATION_FOLDER=." \
  -p 5599:8080 \
  --name access-webapi \
  --hostname access-webapi \
  -v <setting-folder>\webapi-appsettings.json:/opt/shuttle.access.webapi/appsettings.json \
  -d shuttle/access-webapi:latest
```
:::

## Front-end

Finally, create the front-end instance:

(hosted on port `3005` in this example, change as needed)

::: code-group
```cmd [cmd]
docker run ^
  --network development ^
  --restart always ^
  -e "VITE_API_URL=http://localhost:5599" ^
  -p 3005:80 ^
  --name access-front-end ^
  --hostname access-front-end ^
  -d shuttle/access-vue:latest
```
```ps [ps]
docker run `
  --network development `
  --restart always `
  -e "VITE_API_URL=http://localhost:5599" `
  -p 3005:80 `
  --name access-front-end `
  --hostname access-front-end `
  -d shuttle/access-vue:latest
```
```bash [bash]
docker run \
  --network development \
  --restart always \
  -e "VITE_API_URL=http://localhost:5599" \
  -p 3005:80 \
  --name access-front-end \
  --hostname access-front-end \
  -d shuttle/access-vue:latest
```
:::

## Done

Once all the containers have started up, you can browse to the [front-end](http://locahost:3005):

```
http://locahost:3005
```

Which should bring you to the sign-in page where `admin` is the identity as well as the password.

To view the web-api endpoints you can browse to the [swagger page](http://locahost:5599/swagger/index.html):

```
http://locahost:5599/swagger/index.html
```