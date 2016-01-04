# Description 
Apcera Chat, is a simple chat program that reads and writes chat data from MySQL.

#Screenshot

![Graph](http://i.imgur.com/02mNj5m.png)

# Run Apcera Chat from the Apcera Platform with a service gateway
![Graph](https://www.linux-toys.com/apcerachat_sg.png)
```
apc docker run mysqldatabase -i rusher81572/mysql --port 3306 --batch
(Wait 30 seconds for database to initialize)
apc provider register mysqldatabase-provider -j mysqldatabase --u mysql://root:sql@mysqldatabase --batch
apc app create nodechat --batch
apc service create mysqldatabase-service --provider mysqldatabase-provider -j nodechat --batch
apc app start nodechat --batch
```

# Run Apcera Chat from the Apcera Platform with a job binding
![Graph](https://www.linux-toys.com/apcerachat_job.png)
```
apc docker run mysqldatabase -i rusher81572/mysql --port 3306
(Wait 30 seconds for database to initialize)
apc app create nodechat -e USERNAME="root" -e PASSWORD="sql" --batch 
apc job link nodechat -t mysqldatabase -n dblink -p 3306
apc app start nodechat
```

Now you should be able to access it in your web browser with the URL located from "apc app show nodechat".

# Enable the Twitter bot to listen for Tweets on a particular topic.
To have Apcera Chat listen for Tweets, the following environment variables need to be set before the application launches: consumer_key, consumer_secret, access_token_key, access_token_secret, and twitter_topic. If any of these variables are not specified, Twitter support will be disabled. They keys are available from your apps.twitter.com account. The variable "twitter_topic" sets what Apcera Chat will look for from the Twitter live stream and paste the Tweet into the chat room.
```
apc app update nodechat -e consumer_key="***" -e consumer_secret="***" -e access_token_key="***" -e access_token_secret="***" -e twitter_topic="***"
```

# Apply service gateway rules to prevent "Clear Chat" and "Drop Table" buttons from working.
To prevent these buttons from working with a service gateway, run the following commands:

```
apc rule create simpleDeny --service mysqldatabase-service -t hook --commands drop,truncate
```

# Monitoring with New Relic
1. Create newrelic.js in the application directory with your license key.
```
exports.config = {
  app_name: ['Chat'],
  license_key: 'XXXX',
  logging: {
    level: 'info'
  }
}
```
2. Modify package.json with the newrelic dependency.
```
  "dependencies": {
    "express": "latest",
    "newrelic": "latest",
```
3. Modify main.js and make this the first line. 
```
require('newrelic');
```
