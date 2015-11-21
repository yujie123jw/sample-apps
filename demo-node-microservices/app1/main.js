var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var user = 'admin';
var password = 'admin';
var othernodeURI = process.env.APPLINK_URI;
var port = process.env.PORT;
var database = 'chat';
console.log('Debug' + othernodeURI);
app.get('/logo.png', function(req, res){
res.sendFile(__dirname + '/logo.png');
});

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

app.get('/login', function(req, res){
var get_user = req.query['username'];
var get_pass = req.query['password'];
if (get_user == user)  {
	if (get_pass == password){
res.end('<html><title>Access Granted</title><body><p align=center style="font-size:20px"><b>Access Granted. If you see the image below, it is being served from another container</b>' 
	+ '<br><br><img src="' + othernodeURI + '/version1.png">'
        + '<br><br><br><p align=center style="font-size:20px"><b>How it works?</b><br><br><br><img src="' + othernodeURI + '/image2.png">'
        + '</body</html>');
	} else {
	res.write('<html><title>Access Denied</title><body>Invalid Login!</body</html>');
	}
} else {
	res.write('<html><title>Access Denied</title><body>Invalid Login!</body</html>');
}
});

server.listen(port, function(){
console.log('listening on *:' + port);
});
