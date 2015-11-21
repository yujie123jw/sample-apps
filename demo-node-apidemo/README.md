# License
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.

# Description 

This demonstration shows how to interact with the API from a NodeJS web application on the Apcera Platform.

# How to run - Apcera

$TOKEN should be your Bearer token. $CLUSTER should be the address of the API server. 
You can find this info in `.apc` file under $APC_HOME directory. 

```
cd demo-node-apidemo
apc app create node-apidemo-app --stager /apcera::nodejs -ae --batch 
apc app update node-apidemo-app  -e TOKEN="$TOKEN" -e CLUSTER="$CLUSTER" --restart --batch
apc app start node-apidemo-app 
```

Navigate to the URL provided from the app staging process to view the output page.


# How to run - Docker

```
cd demo-node-apidemo
```

Edit "Dockerfile" and replace "myToken" with the Bearer token and api.cluster.net with the correct address

Save and exit the file and build a container:
```
docker build -t apidemo .
```
Run the container:
```
docker run -d --net=host apidemo
```
Connect to the web interface on port 8080. 
