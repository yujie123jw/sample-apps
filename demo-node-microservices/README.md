# License
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.

A copy of the GNU GPL is located in `LICENSE.txt`.

# Description 
This application runs two containers on the Apcera Platform to show how two containers can interact. The first container is called app1 and it creates a simple NodeJS server. The second container app2 runs another NodeJS server that only serves an image called 'diagram.png'. After logging in the app with the default username and password of "admin", it will render HTML and load an image from the second container.

# Apcera Instructions

App1 will use the envrironment variable "APPLINK_URI" to know the public URI of app2 to render an image.

```
cd app1
apc app create app1 --start --batch
```
Navigate to the URL provided from the app staging process to view the output page. Login with admin/admin, you will see no image.

Now, create and start the app2.

```
cd ../app2
apc app create app2 --start --batch
```

Update the APPLINK_URI environment variable in app1 to the URI of app2 
```
apc app update app1 --env-set APPLINK_URI="http://app2.username.demo.apcera.net"
```


You should now be able to access the web app located at the URI for app1. Type the following to get the URI for app1:
```
apc app show app1 | grep -i Route
```

Type the address in your browser. After you login with admin/admin, you should see text with an image.
