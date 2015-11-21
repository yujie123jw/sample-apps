# example-go-rabbitmq

example-go-rabbitmq is a very basic app to try a RabbitMQ service.

## Create an app
```
apc app create example-go-rabbitmq
```

## Create a service
```
apc service create myrabbit --type rabbitmq
```

## Bind service to app
```
apc service bind myrabbit --job example-go-rabbitmq
```

## Start app with service
```
apc app start example-go-rabbitmq
```

## Usage
Once the app is running, first, visit `/push/foo` to push something on the queue. Then, visit `/pop` to retrieve the item.