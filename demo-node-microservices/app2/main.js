var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var port = process.env.PORT;
var database = 'chat';

app.get('/version1.png', function(req, res){
res.sendFile(__dirname + '/version1.png');
});

app.get('/image2.png', function(req, res){
res.sendFile(__dirname + '/image2.png');
});

server.listen(port, function(){
console.log('listening on *:' + port);
});
