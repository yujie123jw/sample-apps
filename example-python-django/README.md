### example-python-django

This sample python django application displays "Hello, world!". The `runtime.txt` informs the Apcera Plaform's built-in python stager which version of python should be used via dependency resolution.

To create the app, perform the following:

```
cd example-python-django
apc app create example-python-django-app
```

Next, start the app as follows:

```
apc app start example-python-django-app
```

Navigate to the URL provided from the app staging process to view the output page.