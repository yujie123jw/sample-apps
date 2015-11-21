# Rails Stager

This is a sample rails stager using Apcera Platform Stager API.

## Loading the Stager

```console
$ apc stager create /example/stagers::rails --start-command="./stager.rb" --staging=/apcera::ruby --pipeline -ae
```

## Deploying with the Stager

To deploy an application with the new rails stager and staging pipeline, you can use the
`apc app create` command along with specifying to use the `rails` staging
pipeline. This can be tested with the 'example-rails-mysql' application in sample-apps.
This application has a manifest that will setup all needed services and settings.

```console
$ cd <path/to/example-rails-mysql>
$ apc app create --start
```
