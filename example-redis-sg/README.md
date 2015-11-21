## example-redis-sg

This is a sample redis service gateway. It demonstrates Apcera Platform's ability to promote an application to a service gateway.

In this tutorial, we promote an app to a service gateway and create a capsule running `redis-server` from which we provision redis services.

## Deployment

1) Deploy the example-redis-sg
```console
cd example-redis-sg
apc app create redis-sg --disable-routes
```

2) Promote the app to a service gateway
```console
apc gateway promote redis-sg --type redissg
```

3) Create a capsule running redis that allows egress. We need to pull in apt packages.
```console
apc capsule create redis-server --image linux -ae
```

4) Login to the capsule
```console
apc capsule connect redis-server
```

5) Setup redis in the capsule. We need the universe repo.
```console
echo "deb http://archive.ubuntu.com/ubuntu trusty universe" > /etc/apt/sources.list
apt-get update && apt-get install redis-server -y
sed -i "s/127.0.0.1/0.0.0.0/1" /etc/redis/redis.conf
sudo /etc/init.d/redis-server restart
exit
```

6) Add port to the capsule so that redis can be reached
```console
apc app update redis-server --port-add 6379
```

7) Register the capsule as a provider in Apcera Platform
```console
apc provider register redis --type redissg --job redis-server -p 6379 --url redis://redis-server
```

8) Now you should see the provider in your provider list!
```console
apc provider list
```

9) Add a redis service to the provider. This ties it to a particular db. Each call to register a service will give you an additional database you can bind against.
```console
apc service create redis-db-0 --provider redis
```

10) Bind your app to the redis service!
```console
apc service bind redis-db-0 -j redis-sg
```

### Testing Redis Gateway Locally

Below are sample commands you can use to test the web app using curl, when you deployed your app locally rather than on Apcera Platform. This should clarify exactly how the API works.

#### Create a provider
```console
curl -i -X POST -H "Content-Type: application/json" -d '{"params": {"url": "redis://localhost:6379"}}' "http://localhost:9292/providers"
```

#### Get a provider
```console
curl -i -X GET "http://localhost:9292/providers/:provider_id"
```

#### List providers
```console
curl -i -X GET "http://localhost:9292/providers"
```

#### Delete a provider
```console
curl -i -X DELETE "http://localhost:9292/providers/:provider_id"
```

#### Create a service
```console
curl -i -X POST -H "Content-Type: application/json" -d '{"provider_id":"<PROVIDER ID>","params":{"db":"0"}}' "http://localhost:9292/services"
```

#### Get a service
```console
curl -i -X GET "http://localhost:9292/services/:service_id"
```

#### List services
```console
curl -i -X GET "http://localhost:9292/services"
```

#### Delete a service
```console
curl -i -X DELETE "http://localhost:9292/services/:service_id"
```

#### Create a binding
```console
curl -i -X POST -H "Content-Type: application/json" -d '{"service_id":"<SERVICE ID>","params":{"db":"0"}}' "http://localhost:9292/bindings"
```

#### Get a binding
```console
curl -i -X GET "http://localhost:9292/bindings/:binding_id"
```

#### List bindings
```console
curl -i -X GET "http://localhost:9292/bindings"
```

#### Delete a binding
```console
curl -i -X DELETE "http://localhost:9292/bindings/:binding_id"
```
