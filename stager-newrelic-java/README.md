# New Relic Java Stager

Include New Relic in your java apps.

## Setup

First clone your Java stager.

```console
$ apc staging pipeline clone /apcera::java --name java‐newrelic
```

Then create the New Relic java stager.

```console
$ apc stager create newrelic‐java --start-cmd "./stager.rb" --staging=/apcera::ruby
```

Last, append the New Relic stager.

```console
$ apc staging pipeline append java‐newrelic newrelic‐java
```

## Staging an app

To stage a java application with New Relic support just pass it to the newrelic-java staging pipeline
and provide your NEW_RELIC_LICENSE_KEY as an ENV var.

```console
$  apc app create music -sp newrelic‐java -e NEW_RELIC_LICENSE_KEY='xxxxxxxxxxx' -ae --start
```
