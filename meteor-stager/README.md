# Meteor Stager

Stage Meteor apps within the Apcera platform!

## Loading the Stager

```console
$ apc stager create /example/stagers::meteor --start-command="./stager.rb" --staging=/apcera::ruby -ae -m 1GB --pipeline
```

## Staging an app

In order to stage a Meteor application simply use `apc app create` and point it at the newly created Meteor stager! Note that Meteor applications use quite a bit of RAM and you must pass in the ROOT_URL which is the application's public facing URL. This should match the http route you plan on having on the job.

```console
apc app create meteor-app --stager /example/stagers::meteor --start -m 1GB -e "ROOT_URL=http://your.public.route.com"
```
