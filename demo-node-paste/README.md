# Description 
A simple pastebin clone written in Node.js. It requires a MySQL backend. 

# Screenshot

![Graph](http://i.imgur.com/qryh6TZ.png)

# How to run 

If you do not have a MySQL database, do the following:
```
apc docker run mysqldatabase -i apcerademos/mysql --port 3306 --batch
(Wait 30 seconds for database to initialize)
apc provider register mysqldatabase-provider -j mysqldatabase --u mysql://root:sql@mysqldatabase --batch
```
After this repository is cloned, create the application and bind it to a MySQL service. 
The $SITE_NAME envrionment variable is the HTTP route to the paste application.  The URL must be appended with /paste.
This is required for the pastes to be displayed properly.
```
cd demo-node-paste
apc app create paste -e SITE_NAME='http://paste.demo.apcera.net/paste' -r http://paste.demo.apcera.net --batch
apc service create mysqldatabase-paste -p mysqldatabase-provider -j paste --batch
apc app start paste
```
When complete, you can login with your browser to the application location.

# Apply service gateway rules to prevent deletion of pastes

To prevent the delete button from working with a service gateway, run the following commands:

```
apc rule create SimpleDenyDelete --service mysqldatabase-paste -t hook --commands delete
```

# Pasting with curl 
```
curl -X POST "http://paste.demo.apcera.net/paste/newpaste" --data-urlencode "text=hello world"
```

# View a paste with curl using a paste id
```
curl http://paste.demo.apcera.net/paste/show?id=XXXXXXXXXX
```
# Delete a paste with curl using a paste id
```
curl http://paste.demo.apcera.net/paste/delete?id=XXXXXXXXXX
```

# Paste a file with curl 
```
output=`cat file.txt`;  curl -X POST "http://paste.demo.apcera.net/paste/newpaste" --data-urlencode "text=$output"
```

# Paste output of a command with curl 
```
output=`hostname`;  curl -X POST "http://paste.demo.apcera.net/paste/newpaste" --data-urlencode "text=$output"
```


