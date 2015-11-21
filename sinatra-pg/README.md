### sinatra-pg

This sample Ruby Sinatra app consumes a postgres service via the `POSTGRES_URI` environment variable and exposes several endpoints for seeing environment, interacting with the database, or seeing the unique instance idea of the app.

To use this application:

1) You must have a postgres provider registered. Most installations have one available; you may also register a Docker image as a provider.

Note that if a postgres provider does not exist in your cluster, you can register one using [Apcera Documentation](http://docs.apcera.com/services/types/service-postgres/).

2) Create the app.

```console
apc app create sinatra-pg
```

3) Create a postgres service.

```console
apc service create pgdb --provider <postgres-provider-FQN>
```

4) Bind the app to the service.

```console
apc service bind pgdb --app sinatra-pg
```

5) Start the app.

```console
apc app start sinatra-pg
```
