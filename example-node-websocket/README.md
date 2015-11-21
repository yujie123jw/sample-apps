# example-node-websocket

This is an example chat application written by Martin Sikora — it was adapted to run in Apcera Platform.

* Original post: http://martinsikora.com/nodejs-and-websocket-simple-chat-tutorial
* Original source: https://gist.github.com/martinsik/2031681

Here, the dependencies are bundled into the `node_modules` directory. To fetch fresh dependencies via `npm`, simply delete the `node_modules` directory and re-upload.

The original author did not specify a license.

To create the app, perform the following:

```
cd example-node-websocket
apc app create example-node-websocket-app
```

Next, start the app as follows:

```
apc app start example-node-websocket-app
```

Navigate to the URL provided from the app staging process to view the output page.
