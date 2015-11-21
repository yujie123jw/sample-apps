### example-python-wsgi

This sample python wsgi app outputs "Hello World!".

It listens on either `$PORT` (the chosen port Apcera Platform exposes via environment variable) or at port 5000.

The `runtime.txt` file instructs the Apcera Platform's python stager which version of python should be used.

To create the app, perform the following:

```
cd example-python-wsgi
apc app create example-python-wsgi-app
```

Next, start the app as follows:

```
apc app start example-python-wsgi-app
```

Navigate to the URL provided from the app staging process to view the output page.
