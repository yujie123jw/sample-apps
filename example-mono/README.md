# Mono.NET

This is a path to get .NET applications running on mono project, in a linux environment.

three things are provided:

 * A mono runtime environment (./runtime)
 * A stager (with instructions for creating the stager and staging pipeline) (./stager)
 * A very small mono sample app (./app)
 
The mono runtime is already installed in the proveapcera.io cluster.  If you wish to use it elsewhere, you will likely need to install it.  

When creating your app, the stager type will not be auto-detected (that is something that we can't set up on our own).  Thus, you will need to specify that on your own.  It is specified in the sample app's manifest:

```code
name: "aspx-sample"

staging_pipeline: "/apcera::mono"

templates: [
  {
    path: "/app/info.aspx"
  }
]
```

However, you can specify it on the command line:

```console
apc app create aspx-sample --staging /apcera::mono
```

Note that the 512mb was just a swag, it is entirely possible that it is off-base.

## Runtime Package

To create the runtime package, switch to the runtime directory, then run:

```console
apc package build mono.conf
```

## Mono Stager

To create the staging pipeline, switch to the stager directory, then run:

If the stager already exists, you can delete it via:

```console
apc staging pipeline delete /apcera::mono --batch
apc stager delete /apcera/stagers::mono --batch
```

Then create them:

```console
apc stager create mono --start-command="./stager.rb" --staging=/apcera::ruby --batch --namespace /apcera/stagers
apc staging pipeline create /apcera/stagers::mono --name mono  --namespace /apcera --batch
```

