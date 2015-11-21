# sp-latency-grapher

This project collects information from a configured Semantic Pipeline (SP) notify hook, and
renders a graph showing various latencies from the transaction and SP.


## Getting Started

1. Create and start the application

```
cd sp-latency-grapher
apc app create sp-latency-grapher-app
```

Next, start the app as follows:

```
apc app start sp-graph-app
```

2. Set up a SP on the application
3. Create a rule to Latency Grapher from the SP where the hook feeds data into Latency Grapher's `/log` endpoint.
  * Example of a postgres service rule called "tododb": `apc rule create graphrule --provider postgres --service tododb --type=notification --stage=roundtrip --url=http://$APP_URL/log`

## Testing locally

Prerequisites:

* NodeJS
* npm

Run the app

1. `npm install`
2. `node app.js`
