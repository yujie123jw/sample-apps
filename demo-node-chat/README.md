# License
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.

# Description 
Apcera Chat, is a simple chat program that reads and writes chat data from MySQL.

#Screenshot

![Graph](https://www.linux-toys.com/nodechat1.png)

# Run Apcera Chat from the Apcera Platform
```
apc docker run mysqldatabase -i rusher81572/mysql-dev --port 3306
apc app create nodechat -e USERNAME="root" -e PASSWORD="sql" --batch 
apc job link nodechat -t mysqldatabase -n dblink -p 3306
apc app start nodechat
```

Now you should be able to access it in your web browser with the URL located from "apc app show nodechat".
