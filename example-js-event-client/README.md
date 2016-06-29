# Basic JavaScript Event Client

This sample demonstrates how to create a basic web application that streams events from an Apcera cluster using the [Wampy.js](https://github.com/KSDaemon/wampy.js) WAMP library.

## Running the sample

To run this sample you will need an API token for your cluster. You can obtain this from the `$HOME/.apc` file created by APC, for example:

    {
      "target": "https://example.com",
      "tokens": {
        "https://example.com": "Bearer eyJ0eXAiOiIiLCJhbGciO..."
      },
      ...
    }

## Running the app locally

1. Open **index.html** and replace the value of the `token` variable with your API token, e.g.
   
    // Replace with your API token
     var token = "Bearer eyJ0eXAiOiIiLC....";   
