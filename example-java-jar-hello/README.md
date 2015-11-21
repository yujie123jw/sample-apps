# example-java-jar-hello

example-java-jar-hello is a simple console app.

## Files
`Hello.java.source` contains the Java source. This file ends in .source because
if any .java files are found in the directory, the Java stager will use the
Source app type instead of the Jar app type.

`hello.jar` is the executable jar file. It prints "Hello, World!" to
stdout. You can run the jar file locally with `java -jar hello.jar`. It was
created with Java 6.

`manifest.txt` is the manifest file used for `hello.jar`.

## Deploying the app

To create the app, perform the following:

```
cd example-java-jar-hello
apc app create example-java-jar-hello-app
```

Next, start the app as follows:

```
apc app start example-java-jar-hello-app
```

The app will output "Hello World" in every 15 seconds.

