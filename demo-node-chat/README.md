# License
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.

# Description 
NodeJS Chat, is a simple chat program that reads and writes chat data from MySQL.

#Screenshot

![Graph](https://www.linux-toys.com/nodechat1.png)

# How to run
Prior to running the application, you will need to create the shell variable "MYSQL_URI" to point to your MySQL server. 
```
git clone https://github.com/rusher81572/nodechat.git
cd nodechat
npm install
export MYSQL_URI="mysql://root:sql@192.168.1.110:3306/"
node main.js
```
Connect to the web interface on port 8080. If the existing database is not found, the app will try to create one and bring you into the chatroom.

# Run Node JS Chat from Docker

If you do not have a MySQL server running, you may run my container from Docker Hub. For MySQL, the username is 'root' and the password is 'sql'. The command below will start the server listening on the host interface. You can adjust the Docker command as needed.
```
docker run -d --net=host rusher81572/mysql
```

Now that you have a database running, run the following commands to build and run the application container. Like the database, the Docker commands below bind the container to the host interface IP to simplify deployment. 

```
cd /tmp
git clone https://github.com/rusher81572/nodechat.git
cd nodechat
(Modify the IP address to the database in 'DockerFile' if you are not using my MySQL container from Docker Hub)
docker build -t nodechat .
docker run -d -v /tmp/nodechat:/nodechat --net=host nodechat
```




# Run Node JS Chat from the Apcera Platform
```
apc docker run mysqldatabase -i rusher81572/mysql-dev --port 3306
apc provider register mysqldatabase-provider --job mysqldatabase -u mysql://root:sql@mysqldatabase --batch
apc app create nodechat --batch 
apc service create mysqldatabase-service --provider mysqldatabase-provider --job nodechat --batch
apc app start nodechat
```

Now you should be able to access it in your web browser with the URL located from "apc app show nodechat".
