# Example Rails MySQL

This is a simple app to highlight mysql services within Apcera Platform. This app
requires the stager included in the 'stager' directory. 

## Deploying the App
This app requires two things: "rails" stager under "/example/stagers" namespace and "mysql" provider under "/apcera/providers" namespace.

To create the rails stager, 

```
cd example-rails-mysql/stager
apc stager create /example/stagers::rails --start-command="./stager.rb" --staging=/apcera::ruby --pipeline -ae
```

To register a mysql provider under "/apcera/providers" namespace, please take a look at [here](http://docs.apcera.com/services/types/service-mysql/)

After registering the mysql provider, you can deploy the app as follows.

```
cd ..
apc app create rails-mysql-app --start
```

Navigate to the URL provided from the app staging process to view the output page.

## Setting up the DB for Production

```
apc app run rails-mysql-app -c "bundle exec rake db:migrate"
```
