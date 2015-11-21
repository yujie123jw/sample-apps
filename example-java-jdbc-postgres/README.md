### example-java-jdbc-postgres

Sample java app that connects to Postgres via a JDBC adapter. It reads the connection settings from the `JDBC_POSTGRES_URI` env variable.

## Deploying

```console
$ apc app create jdbc-postgres -dr --restart no
```

## Binding To Postgres

Create a postgres service using one of your postgres providers

```console
$ apc service create postgres-service -t postgres --provider /apcera/bootstrap::postgres --batch
```
Bind the app to this new service 

```console
$ apc service bind postgres-service -j jdbc-postgres
```

Start the app 

```console
$ apc app start jdbc-postgres
```
