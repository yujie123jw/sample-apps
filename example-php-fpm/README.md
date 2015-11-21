### example-php-fpm

This sample app displays "Hello, World!" in a web view. The `runtime.txt` informs Apcera Platform how it should stage this app.

To create the app, perform the following:

```
cd example-php-fpm
apc app create example-php-fpm-app
```

Next, start the app as follows:

```
apc app start example-php-fpm-app
```

Navigate to the URL provided from the app staging process to view the output page.

