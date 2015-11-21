### sp-auth-hook-no-delete

This sample app is a nodejs app that listens on either `$PORT` or port 4000. A `POST /auth` responds with boolean of either `permitted: true` or `permitted: false`, depending upon the action taken in the body.

-----

To create the app, perform the following:

```
cd sp-auth-hook-no-delete
apc app create sp-auth-hook-app
```

Next, start the app as follows:

```
apc app start sp-auth-hook-app
```

Navigate to the URL provided from the app (APP_ROUTE_URL) staging process to view the output page.

To test this behavior:

Permitted operation
```
curl -d "Command=/" -X POST http://APP_ROUTE_URL/auth
```

Blocked operation
```
curl -d "Command=/DROP/1" -X POST http://APP_ROUTE_URL/auth
```
