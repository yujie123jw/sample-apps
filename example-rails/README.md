### example-rails

This sample Rails app renders a simple web view display that displays the next BART train information as scraped from `http://api.bart.gov`.

The API key, obtained at the above link, is exposed to the app via an environment variable: `BART_KEY`.

This app needs access to the internet.

To create and start this app, do the following:

1. Obtain API key from http://api.bart.gov
2. Create the app using the command: `apc app create rails -ae -e BART_KEY="<key>" --start` where "<key>" is the API key obtained from step 1.
