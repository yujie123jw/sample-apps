# nats-cast

## Start the server

```
apc app create cast-server --start --batch
```

In a web browser, visit the URL created for this app.

## Bind gnatsd service to server app

```
apc service create mynats --type gnatsd --batch
apc service bind mynats --job cast-server --batch
```

## Create some clients

```
apc app create cast-client-1 --disable-routes --start --batch
apc app create cast-client-2 --disable-routes --start --batch
```

## Bind gnatsd service to client apps

```
apc service bind mynats --job cast-client-1 --batch
apc service bind mynats --job cast-client-2 --batch
```

## View incomming messages

Go back to the cast-server web page and start typing in the textbox.

```
apc app logs cast-client-1
apc app logs cast-client-2
```
