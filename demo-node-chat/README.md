# License
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.

# Description 
Apcera Chat, is a simple chat program that reads and writes chat data from MySQL.

#Screenshot

![Graph](https://linux-toys.com/apcera-nodechat.png)

# Run Apcera Chat from the Apcera Platform with a service gateway
![Graph](https://www.linux-toys.com/apcerachat_sg.png)
```
apc docker run mysqldatabase -i rusher81572/mysql-dev --port 3306 --batch
(Wait 30 seconds for database to initialize)
apc provider register mysqldatabase-provider -j mysqldatabase --u mysql://root:sql@mysqldatabase --batch
apc app create nodechat --batch
apc service create mysqldatabase-service --provider mysqldatabase-provider -j nodechat --batch
apc app start nodechat --batch
```

# Run Apcera Chat from the Apcera Platform with a job binding
![Graph](https://www.linux-toys.com/apcerachat_job.png)
```
apc docker run mysqldatabase -i rusher81572/mysql-dev --port 3306
(Wait 30 seconds for database to initialize)
apc app create nodechat -e USERNAME="root" -e PASSWORD="sql" --batch 
apc job link nodechat -t mysqldatabase -n dblink -p 3306
apc app start nodechat
```

Now you should be able to access it in your web browser with the URL located from "apc app show nodechat".

# Enable the Twitter bot to listen for tweets on a particular topic.
To have Apcera Chat listen for Tweets, the following environment variables need to be set before the application launches: consumer_key, consumer_secret, access_token_key, access_token_secret, and twitter_topic. If any of these variables are not specificed, Twitter support will be disabled. They keys are available from your apps.twitter.com account. The variable "twitter_topic" sets what Apcera Chat will look for from the Twitter live stream and paste the Tweet into the chat room. 
```
apc app update nodechat -e consumer_key="***" -e consumer_secret="***" -e access_token_key="***" -e access_token_secret="***" -e twitter_topic="***"
```
