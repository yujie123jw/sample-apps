### example-ruby-memcache

This app is a sample ruby app that consumes a memcache service exposed to the app via the `MEMCACHE_URI` environment variable.

To use this application with a memcache service in Apcera Plaform:

1) Create the app:

```console
cd example-ruby-memcache
apc app create ruby-memcache
```

2) Create the memcache service:

```console
apc service create memcachedb --type memcache
```

3) Bind the application to the new service:

```console
apc service bind memcachedb --app ruby-memcache
```

4) Start the app:

```console
apc app start ruby-memcache
```

5) Set and get values using curl:

*Setting value to 1:*
```console
curl -X POST http://ruby-memcache.<your-domain>/set/value/1 -d ''
```

*Getting the value of `value`:*
```console
curl http://ruby-memcache.<your-domain>/get/value
```


