### nats-ping

Go app that performs NATS request on 'test' subject endpoint on an interval.
Uses 'NATS_URI' environment variable to discover a NATS server.

Deploy with `apc app create nats-ping --disable-routes`

The Docker folder provides the Dockerfile for the Dockerized version of this app, and updated source code. You can pull the Docker image from https://hub.docker.com/r/apcera/nats-ping-client/, or using `apc docker run -i apcera/nats-ping-client`. 