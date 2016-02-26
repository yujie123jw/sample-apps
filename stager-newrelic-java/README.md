# New Relic Java Stager

Include New Relic in your java apps.

## Setup

First clone your java stager.

```console
$ apc staging pipeline clone /apcera::java ‐n /apcera::java‐newrelic
```

Then create the New Relic java stager.

```console
$ apc stager create newrelic‐java ‐‐start‐command=" ./stager.rb" ‐‐staging=/apcera::ruby
```

Last, append the New Relic stager.

```console
$ apc staging pipeline append /apcera::java‐newrelic /apcera/stagers::newrelic‐java
```

## Staging an app

To stage a java application with New Relic support just pass it to the java-newrelic staging pipeline
and provide your NEW_RELIC_LICENSE_KEY as an ENV var.

```console
$ apc app create java-app --stager /apcera::java-newrelic --start -e "NEW_RELIC_LICENSE_KEY=YOUR_KEY" -ae
```
