### node-red

Node-RED package, package script, and manifest file for deploying Node-RED to the Apcera Platform.

1. Import or build the node-red package.

`cd /sample-apps/node-red`

The easiest thing to do is import the package by running:

`apc package import node-red.cntmp`

Or, to build the package using the script, run:

`apc package build node-red.conf -ns /apcera/pkg/packages`

NOTE: You may have to update the Node version (`runtime: "node-0.10.33"`) in the package script to match the appropriate version of the Node runtime package in your cluster. 

2. Create the node-red-app.

Edit /sample-apps/node-red/node-red-app.conf.

- Update the namespace
- Edit the route endpoint: cluster-name and domain (if necessary)
- Save changes

Create the node-red-app:

`apc app create --config node-red-app.conf`

3. Access the node-red-app.

`App should be accessible at "http://node-red.cluster-name.apcera-platform.io"`


