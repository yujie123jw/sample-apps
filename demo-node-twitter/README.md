# Description 
Apcera Twitter, is a simple twitter feed program that stores tweets in a MySQL Database. To have Apcera Twitter listen for Tweets, the following environment variables need to be set before the application launches: consumer_key, consumer_secret, access_token_key, access_token_secret, and twitter_topic. If any of these variables are not specified, Twitter  will be disabled. They keys are available from your apps.twitter.com account. The variable "twitter_topic" sets what Apcera Twitter will look for from the Twitter live stream and paste the Tweet into the page.

# Run Apcera Twitter from the Apcera Platform with a service gateway
![Graph](http://i.imgur.com/qzC4xQH.png)
```
apc docker run mysqldatabase -i rusher81572/mysql-dev --port 3306 --batch
(Wait 30 seconds for database to initialize)
apc provider register mysqldatabase-provider -j mysqldatabase --u mysql://root:sql@mysqldatabase --batch
apc app create apceratwitter -ae --batch
apc service create mysqldatabase-service --provider mysqldatabase-provider -j apceratwitter --batch
apc app update apceratwitter -e consumer_key="***" -e consumer_secret="***" -e access_token_key="***" -e access_token_secret="***" -e twitter_topic="***"
apc app start apceratwitter --batch
```

# Run Apcera Twitter from the Apcera Platform with a job binding
![Graph](http://i.imgur.com/RTYUeke.png)
```
apc docker run mysqldatabase -i rusher81572/mysql-dev --port 3306
(Wait 30 seconds for database to initialize)
apc app create apceratwitter -e USERNAME="root" -e PASSWORD="sql" -ae --batch 
apc job link apceratwitter -t mysqldatabase -n dblink -p 3306
apc app update apceratwitter -e consumer_key="***" -e consumer_secret="***" -e access_token_key="***" -e access_token_secret="***" -e twitter_topic="***"
apc app start apceratwitter
```

Now you should be able to access it in your web browser with the URL located from "apc app show apceratwitter".
