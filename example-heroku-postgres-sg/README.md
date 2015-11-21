## example-heroku-postgres-sg

This is a sample postgres service gateway for heroku. It demonstrates the Apcera Platform's ability to take a staged application and promote it to act as a service gateway for brokering connections between services and consumers.

## Deployment

1) Deploy the example-heroku-postgres-sg

```console
cd example-heroku-postgres-sg
apc app create heroku-postgres --disable-routes
```

2) Promote the app to a service gateway
```console
apc gateway promote heroku-postgres --type postgresql
```

3) Create a service by choosing one of the postgres providers. (To check your providers, ```apc provider list -ns /```)
If you don't have any postgres provider, please take a look at [here] (http://docs.apcera.com/services/types/service-postgres/) to register a postgres provider.
``` console
apc service create heroku_mytest -- -url postgres://user:pass@local:port/db
```


Check out to see this new app as a gateway 

```
apc gateway list
```