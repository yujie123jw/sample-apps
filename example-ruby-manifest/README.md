# example-ruby-manifest

This sample app is a simple ruby app that demonstrates the use of an app manifest (by default, `continuum.conf`) in order to create an app with easily reproducible settings.

The custom configuration `services.conf` is a separate manifest file that demonstrates the use of manifest files in creating and binding to services at application creation time.

## Install
```
apc app create example-ruby-manifest --start
```

## Usage
* `/` shows different system information, like the current environment variables.
* `/template` will display the result of evaluating the template `app.rb`.