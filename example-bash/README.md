### example-bash

This is a sample bash application that runs two scripts, as accepted by Apcera Platform's built-in bash stager:

1. `bash_setup.sh` to set up the application's running environment and prepare its filesystem
2. `bash_start.sh` to run `nc` and serve a static `index.html` page.

To create the app, perform the following:

```
cd example-bash
apc app create example-bash-app
```

Next, start the app as follows:

```
apc app start example-bash-app
```

Navigate to the URL provided from the app staging process to view the output page.
