# New Relic Java Stager

Include New Relic in your java apps.

## Setup

First clone your Java stager.

```console
$ apc staging pipeline clone /apcera::java --name java‐newrelic-pipeline
```

Then create the New Relic java stager.

```console
$ cd sample-apps/stager-newrelic-java/
$ apc stager create newrelic‐java-stager --start-cmd "./stager.rb" --staging=/apcera::ruby
```

Last, append the New Relic stager.

```console
$ apc staging pipeline append java‐newrelic-pipeline newrelic‐java-stager
```

## Staging an app

To stage a java application with New Relic support, pass it to the New Relic staging pipeline and provide your 
NEW_RELIC_LICENSE_KEY as an ENV var.

```console
$  apc app create myapp -sp java‐newrelic-pipeline -e NEW_RELIC_LICENSE_KEY='xxxxxxxxx' -ae --start
```
