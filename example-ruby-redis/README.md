### example-ruby-redis

This sample Ruby app consumes a Redis service exposed via the `REDIS_URI` environment variable, exposing `/set` and `/get` endpoints to record and retrieve values.

This app also supports setting values via a simple web form.

To use this application with a redis service in Apcera Platform:

1) Create the app:

```console
cd example-ruby-redis
apc app create redisapp
```

2) Create the redis service:

```console
apc service create redisdb --type redis
```

3) Bind the application to the new service:

```console
apc service bind redisdb --app redisapp
```

4) Start the app:

```console
apc app start redisapp
```

5) Set and get values using curl:

*Setting value to 1:*
```console
curl -X POST http://redisapp.<your-domain>/set/value/1 -d ''
```

*Getting the value of `value`:*
```console
curl http://redisapp.<your-domain>/get/value
```


