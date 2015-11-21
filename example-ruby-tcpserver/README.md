### **example-ruby-tcpserver**

This is a sample application to showcase the Apcera Platform tcp router support.

1) First just create the app using apc and disable route generation. That way an http route is not auto created.

```
apc app create example-ruby-tcpserver -dr --start-cmd "ruby ./app.rb"
```

2) Then add the port for `example-ruby-tcpserver`. It listens on the `$PORT` env var, so you can just use port 0.

```
apc app update example-ruby-tcpserver --port-add 0
```

3) Add the needed tcp route. When using auto, it will figure out the public ip for you and assign you a random public port.

```
apc route add tcp://auto -a example-ruby-tcpserver -p 0
```

4) Start the application.

```
apc app start example-ruby-tcpserver
```

5) Profit! Now you should be able to connect to your application via tcp at the route printed by apc.