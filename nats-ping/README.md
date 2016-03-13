# nats-ping-client

The nats-ping-client app is a [NATS](http://nats.io/) client that receives messages (pings) from a NATS server. The nats-ping-client app uses the 'NATS_URI' environment variable to discover the NATS server.

This example demonstrates the multi-workload deployment capabilities of Apcera and job linking for microservices.

You deploy the NATS server using the [official Docker image](https://hub.docker.com/_/nats/). You can deploy the NATS client from the Go source code, or from a [Docker image]((https://hub.docker.com/r/apcera/nats-ping-client/) provided by Apcera. The Dockerfile for this image is provided for reference.

## Deploy NATS server

Deploy the nats-server app from the Docker image:

`apc docker run nats-server -i nats --restart always`

Verify server deployment ('gnatsd is ready'):

`apc job logs nats-server`

## Deploy NATS client

Two ways to deploy the nats-ping-client app.

1) From source code:

`cd /sample-apps/nats-ping`

`apc app create nats-ping-client --disable-routes`

2) From Docker image:

`apc docker run nats-ping-client -i apcera/nats-ping-client`

## Link NATS server and client

`apc job link nats-ping-client --to nats-server --name nats --port 4222`

## Start NATS client 

`apc app start nats-ping-client`

## Verify connectivity

Client connects to server and receives pings:

`apc job logs nats-ping-client`
