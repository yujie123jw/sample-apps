### example-java-war

Simple java web using a war file. Apcera Platform's built-in Java stager knows how to stage Java war files.

For documentation on how to create war files please see the resources below.

Creating War files with Ant   - http://www.tutorialspoint.com/ant/ant_creating_war_files.htm
Creating War files with Maven - http://www.tech-juice.org/2012/05/12/how-maven-builds-a-war-file/

To create the app, perform the following:

```
cd example-java-war
apc app create example-java-war-app
```

Next, start the app as follows:

```
apc app start example-java-war-app
```

Navigate to the URL provided from the app staging process to view the output page.