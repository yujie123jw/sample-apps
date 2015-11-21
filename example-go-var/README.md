### example-go-var

To install please place in your `$GOPATH` at `$GOPATH/src/github.com/apcera/example-go-var`

If the application is deployed without a working golang environment, the app will be named `app`, as we are not able to detect the actual compiled application name.

This sample app responds to HTTP requests with "Hello, World", or with the text of a parameter you optionally pass into it following the start command via `--start-cmd=` , 

```apc app create example-go-var-app --start-cmd="./example-go-var TEXT"```.

Next, start the app as follows:

```
apc app start example-go-var-app
```

Navigate to the URL provided from the app staging process to view the output page.

The default response will be "Hello, World" or the 'TEXT' you added as a parameter to the start command. You can also see the different environment variable define by adding /env to the URI. Adding /rand will generate a random number and /echo will echo the details of the request.
