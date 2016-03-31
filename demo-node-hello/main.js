var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var port = process.env.PORT;

app.get('/', function(req, res){
res.end('Hello, World');
});

server.listen(port, function(){
console.log('listening on *:' + port);
});
