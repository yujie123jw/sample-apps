# example-java-jar-server-env

example-java-jar-server-env is a simple webapp. It renders text when visiting
the `/` or `/bye` routes.

## Files
`ServerEnv.java.source` contains the Java source. This file ends in .source
because if any .java files are found in the directory, the Java stager will use
the Source app type instead of the Jar app type.

`server-env.jar` is the executable jar file. It prints "listening on %d..."
to stdout, where "%d" is the value of the `PORT` environment variable. If
`PORT` isn't set, then the server won't start. Run it locally with
`java -jar server-env.jar`, then visit http://localhost:%d. It was created with
Java 6.

`manifest.txt` is the manifest file used for `server-env.jar`.

## Deploying the app

To create the app, perform the following:

```
cd example-java-jar-server-env
apc app create example-java-jar-server-env-app
```

Next, start the app as follows:

```
apc app start example-java-jar-server-env-app
```

Navigate to the URL provided from the app staging process to view the output page.
