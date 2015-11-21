### example-java-maven

Sample maven app that generates a war file. Once you have deployed it should be available at:

`http://<appname>.<domain>/sample_app`

To create the app, perform the following:

```
cd example-java-maven
apc app create example-java-maven-app
```

Next, start the app as follows:

```
apc app start example-java-maven-app
```

Navigate to the URL provided from the app staging process to view the output page.