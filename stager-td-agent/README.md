# stager-td-agent

This is an example stager that can add a td-agent process to run with your
application.

## Loading the Stager

To load the stager, can use the `apc stager create` command. We will specify the
start command for the stager. Next, we specify that we want to stage our stager
with the ruby pipeline. This will run `bundler` to ensure our stager's
dependencies are all fulfilled, as well as ensuring `ruby` is added as a
dependency on our stager.

After creating our stager, we then prepend the runtime stager we require. For this
example we will use ruby.

```console
$ apc stager create td-agent --start-command="./stager.rb" --staging=/apcera::ruby --pipeline=TRUE
$ apc staging pipeline prepend td-agent /apcera/stagers::ruby
```

Afterwards, should now see the new staging pipeline with the two stagers listed:

```console
$ apc staging pipeline list
╭─────────────┬───────────┬──────────────────────────────────────────────╮
│ Name        │ Namespace │ Stagers                                      │
├─────────────┼───────────┼──────────────────────────────────────────────┤
│ td-agent    │ /         │ job::/apcera/stagers::ruby, job::/::td-agent │
│ bash        │ /apcera   │ job::/apcera/stagers::bash                   │
│ compiler    │ /apcera   │ job::/apcera/stagers::compiler               │
│ docker      │ /apcera   │ job::/apcera/stagers::docker                 │
│ go          │ /apcera   │ job::/apcera/stagers::go                     │
│ java        │ /apcera   │ job::/apcera/stagers::java                   │
│ nodejs      │ /apcera   │ job::/apcera/stagers::nodejs                 │
│ perl        │ /apcera   │ job::/apcera/stagers::perl                   │
│ php         │ /apcera   │ job::/apcera/stagers::php                    │
│ python      │ /apcera   │ job::/apcera/stagers::python                 │
│ ruby        │ /apcera   │ job::/apcera/stagers::ruby                   │
│ static-site │ /apcera   │ job::/apcera/stagers::static-site            │
╰─────────────┴───────────┴──────────────────────────────────────────────╯
```

## Deploying with the Stager

To deploy an application with the new stager and staging pipeline, can use the
`apc app create` command along with specifying to use the `td-agent` staging
pipeline.

```console
$ apc app create app-needing-td-agent --staging=td-agent --start
```
