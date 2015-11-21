### apcera-stager-api

This is a sample sinatra stager using our Apcera Platform Stager API.

## Loading the Stager



```console
cd example-apcera-stager-api/
apc stager create myrubystager --start-command="./stager.rb" --staging=/apcera::ruby --pipeline -ae
```

## Deploying with the Stager

To deploy an application with the new sinatra stager and staging pipeline, you can use the
`apc app create` command along with specifying the use of the `myrubystager` staging
pipeline. This can be tested with the 'demo-ruby-sinatra' application in sample-apps.

```console
cd ../demo-ruby-sinatra
apc app create demo-ruby-sinatra --staging=myrubystager --start
```

Navigate to the URL provided from the app staging process to view the output page.
