### example-rails-unicorn

This sample Rails unicorn app renders a simple web view display that displays next train information as scraped from `http://api.bart.gov`.

The API key, obtained at the above link, is exposed to the app via an environment variable: `BART_KEY`. You can obtain the Bart Key from [here] (http://www.bart.gov/schedules/developers/api).

# Deploying the app

First create the app, 

```apc app create rails-unicorn-app --allow-egress -e BART_KEY="YOUR_BART_KEY"```

Then start the app,

```apc app start rails-unicorn-app```

Navigate to the URL provided from the app staging process to view the output page.
