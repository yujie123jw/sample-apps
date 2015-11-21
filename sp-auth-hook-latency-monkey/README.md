### sp-auth-hook-latency-monkey

This sample app is a nodejs app that listens on either `$PORT` or port 4000. A `POST /auth` introduces a random amount of latency before the app responds.

To create the app, perform the following:

```
cd sp-auth-hook-latency-monkey
apc app create sp-auth-hook-app
```

Next, start the app as follows:

```
apc app start sp-auth-hook-app
```

Navigate to the URL provided from the app staging process to view the output page.
