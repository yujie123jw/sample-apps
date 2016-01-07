### go-nats
Go app that performs NATS request on 'test' subject when you hit '/echo' endpoint.
It also subscribes to 'test' and echoes back 'echo' query parameter from HTTP request.
Uses 'NATS_URI' environment variable to discover a NATS server.

### Deploy a NATS Server
Before deploying a NATS Serve that please make sure that your policy allows you to deploy Docker Jobs.
 If not, you can take a look at [here](http://docs.apcera.com/policy/examples/docker/).

Lets deploy our nats server as a docker image.

```apc docker run nats-server -i nats --restart always```

### Deploy the app

First, create the app as follows

```apc app create go-nats-app```

Link the app to the nats-server

```apc job link go-nats-app --to nats-server --name nats -p 4222```

Start the app
```apc app start go-nats-app```.

Navigate to the URL (APP_URL) provided from the app staging process to view the output page.

Test the app by sending some messages that hits `/echo` endpoint.

```
http://APP_URL/echo?msg=test
```

Confirm that you see the word `test` on the page.
