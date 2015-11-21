### example-static-custom-nginx

This sample "app" is just an `index.html` file with "Hello World" text.  The custom nginx.conf
file overwrites the default and prevents any 404 errors by redirecting you back to index.html.

To create the app, perform the following:

```
cd example-static-custom-nginx
apc app create example-static-custom-nginx-app
```

Next, start the app as follows:

```
apc app start example-static-custom-nginx-app
```

Navigate to the URL provided from the app staging process to view the output page.
