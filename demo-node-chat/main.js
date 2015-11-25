var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var data = [];
var mysql = require('mysql');
var job_bind = process.env.DBLINK_URI;
var username = process.env.USERNAME;
var password = process.env.PASSWORD;
var port = process.env.PORT;
var database = 'chat';
job_bind = job_bind.replace("tcp://","mysql://" + username + ':' + password + '@');
console.log('Debug:' + job_bind + '/');
console.log('Debug:' + job_bind + '/' + database);
var connection = mysql.createPool(job_bind + '/' + database);
var connection_create = mysql.createPool(job_bind + '/');

function showAll (callback) {
	data = "";
connection.getConnection(function(err,connection) {
 	connection.query("select * from chat order by id desc limit 18;", function(err, rows) {	
		if (!err)  {
			data = rows;
		 }else {
			data =  "An error has occurred.";
			console.log(err);
		}
		connection.release();
		callback(data);
		});
		});
}


function truncate () {
     data = "";
    connection.getConnection(function(err,connection) {
	connection.query("truncate chat;", function(err, rows) {
	connection.release();
        });
        });
}

function showall_async(data){
	data.reverse();
			for(var i=0;i != data.length;i++){
			io.emit('show all', data[i].item);
			}
}

function sendMessage(mdata) {
	connection.getConnection(function(err,connection) {
	connection.query("insert into chat (item) values('" + mdata +"');", function(err,rows) {
		if(err) {
			console.log('Error sending chat data', err);
		}
	connection.release();
	});
	});
}

function createdb(callback){
connection_create.getConnection(function(err,connection) {
 connection_create.query("create database " + database + ";", function(err, rows) {
                if(err) {
                console.log('Error creating database', err);
                }
connection.release();
createtable(createtable_async);
callback('Creating Database.....');
                });
                });
}

function createtable(callback){
  connection.getConnection(function(err, connection){
  connection.query("CREATE TABLE chat (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,item VARCHAR(100));", function(err, rows) {
                if(err) {
                console.log('Error creating table',err);
                }
callback('Creating Table......');
	connection.release();
            });
            });
}

function createdb_async(data) {
console.log(data);
}

function createtable_async(data) {
console.log(data);
}

createdb(createdb_async);

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

app.get('/logo.png', function(req, res){
res.sendFile(__dirname + '/logo.png');
});


app.get('/socket.io.js', function(req, res){
res.sendFile(__dirname + '/node_modules/socket.io-client/socket.io.js');
});

io.on('connection', function(socket){
console.log('A user connected');
});

io.on('disconnect', function(socket){
console.log('A user left');
});

io.on('connection', function(socket){
socket.on('show all', function(msg){
showAll(showall_async);
});
});

io.on('connection', function(socket){
socket.on('truncate table', function(msg){
console.log('Starting to truncate table.........');
truncate();
console.log('Finished truncating database.');
});
});

io.on('connection', function(socket){
socket.on('chat message', function(msg){
sendMessage(msg);
showAll(showall_async);
console.log('chat message: ' + msg);
});
});

http.listen(port, function(){
console.log('listening on *:' + port);
});
