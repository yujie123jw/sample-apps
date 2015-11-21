### example-ruby-tunnel

This sample Ruby app renders a simple web view from another website exposed via the `GLUE_URI` environment variable.

-----

To create this app, run a command such as:

```
apc app create ruby-tunnel --allow-egress -e "GLUE_URI=http://xkcd.com/" --start
```

This will create the ruby-tunnel app and specify the intended target. Egress from the app is required to contact the remote page. To change the target after the app is running you can issue the command:

```
 apc app update ruby-tunnel -e "GLUE_URI=NEW_TARGET"
```
