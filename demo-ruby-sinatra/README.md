### demo-ruby-sinatra

This app is used as an example in the Apcera Platform Tutorial, and includes example Stager functionality in `rspec-stager/`. It outputs environment variables (and a few simple unix commands) in a web view, via Sinatra.

The app has a set of rspec tests contained in the `spec` directory that may be executed by the stager in the `rspec-stager` directory. If you create the `rspec-stager` and append it to the ruby staging pipeline, any deployments must pass their rspec tests before they can go live.

To stage an app with the `rspec-stager` in-line:

1) Clone Apcera's Ruby staging pipeline into your namespace:

```console
apc staging pipeline clone /apcera::ruby
```

2) Create the rspec stager and append it to the cloned staging pipeline:

```console
cd demo-ruby-sinatra/rspec-stager
apc stager create ruby-rspec -p rspec-stager --start-command=./rspec-stager --additive --allow-egress
apc staging pipeline append ruby ruby-rspec
```

3) Create the `demo-ruby-sinatra` app.

```console
cd ..
apc app create demo-ruby-sinatra --start --staging=ruby
```

Navigate to the URL provided from the app staging process to view the output page.