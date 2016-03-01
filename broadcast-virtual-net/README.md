# broadcast-virtual-net

This is a sample go app that creates a server app that listens on broadcast
address (255.255.255.255) and a client app that talks to the server on broadcast
address. You can have multiple client apps and one server/listener app. The
intent of this sample app is to showcase/test brodcast capabilities with virtual
networks and jobs.

## Create apps

```
apc app create cast-send --disable-routes --batch
apc app create cast-listen --disable-routes --batch
```

## Create virtual network

```
apc network create mynet
```

## Add apps to network

```
apc network join mynet --job cast-send
apc network join mynet --job cast-listen
```

## Add broadcast route

```
apc job update cast-send --network mynet --broadcast-enable
apc job update cast-listen --network mynet --broadcast-enable
```

## Start apps

```
apc app start cast-send
apc app start cast-listen
```

## See incomming packets

```
apc app logs cast-listen
```
