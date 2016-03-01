var http = require('http');
var express = require('express');
var mysql = require('mysql');
var request = require('request');
var mysql_bind = process.env.MYSQL_URI;
var port = process.env.PORT;
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());
var server = require("http").createServer(app);
var data = [];
var database = 'paste';
var dbURL = process.env.MYSQL_URI;
var mysql_connection = mysql.createPool(dbURL + database);
var mysql_connection_create = mysql.createPool(dbURL);
var password = process.env.PASSWORD;
var site_name = process.env.SITE_NAME;

if(mysql_bind){
    var parse_database =  mysql_bind.toString().split("/");
    database = parse_database[3];
    var uri = mysql_bind.replace(parse_database[3], "");
    var mysql_connection = mysql.createPool(mysql_bind);
    var mysql_connection_create = mysql.createPool(uri);
    createtable(createtable_async); 
}


function createdb_async(data) {
    console.log(data);
}

function createtable_async(data) {
    console.log(data);
}

function createdb(callback){
    mysql_connection_create.getConnection(function(err,connection) {
       mysql_connection_create.query("create database " + database + ";", function(err, rows) {
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
    mysql_connection.getConnection(function(err, connection){
        mysql_connection.query("CREATE TABLE paste (num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,id VARCHAR(1000),item VARCHAR(5000));", function(err, rows) {
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


var defaultHTML = (
    '<html>'
    );


var mini_begin_share_message = ( '<html> <head> <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/cupertino/jquery-ui.css">'
    + '<script src="//code.jquery.com/jquery-1.10.2.js"></script>'
    + ' <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>'
    + '<link rel="stylesheet" href="/resources/demos/style.css">'
    + '<script>'
    + ' $(function() {'
       + '      $( "#dialog" ).dialog();'
       + '  });'
+ ' </script>'
+ '</head>'
+ '<body bgcolor="#f5f5f5">'
+ ' <div id="resizable" class="ui-widget-content">'
);

var begin_share_message = ( '<html> <head> <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/cupertino/jquery-ui.css">'
    + '<script src="//code.jquery.com/jquery-1.10.2.js"></script>'
    + ' <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>'
    + '<link rel="stylesheet" href="/resources/demos/style.css">'
    + '<script>'
    + ' $(function() {'
       + '      $( "#dialog" ).dialog();'
       + '  });'
+ ' </script>'
+ '</head>'
 + '<body bgcolor="#f5f5f5">'
+ '<p align=center><a href="/"><img src="/paste/from.png"></a></p>'
+ '<p align=center></p>'
+ ' <div id="resizable" class="ui-widget-content">'
);

var end_share_mesage = ( '</div></p></body></html>'
    );

app.get('/paste/submitedit', function(req, res){
  var paste_data = req.query['text'];
  var id = req.query['id'];

paste_data = paste_data.replace(/(?:\r\n|\r|\n)/g, '<br />');

  mysql_connection.getConnection(function(err,connection) {
    var safe_paste_data = mysql.escape(paste_data);
    mysql_connection.query("update paste set item=" + safe_paste_data + " where id='" + id + "';", function(err,rows) {
        if(err) {
            console.log('Error sending paste data', err);
        }
        connection.release();
    });
});

  res.end(mini_begin_share_message + '<h3 class="ui-widget-header">Your paste is ready to share!</h3>'+ 'Your paste has been edited:<br><br><a href="' + site_name + '/show?id=' + id + '">' + site_name  + '/show?id=' + id + '</a>' + end_share_mesage);
});


app.post('/paste/newpaste', function(req, res){
  var paste_data = req.body.text;
  var length = 10;
  var id = "";

  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
}


paste_data = paste_data.replace(/(?:\r\n|\r|\n)/g, '<br />');

mysql_connection.getConnection(function(err,connection) {
    var safe_paste_data = mysql.escape(paste_data);
    mysql_connection.query("insert into paste (id,item) values('" + id + "'," + safe_paste_data + ");", function(err,rows) {
        if(err) {
            console.log('Error sending paste data', err);
        }
        connection.release();
    });
});

res.end(mini_begin_share_message + '<h3 class="ui-widget-header">Your paste is ready to share!</h3>'+ 'Location to the paste:<br><br><a href="' + site_name + '/show?id=' + id + '">' + site_name  + '/show?id=' + id + '</a>' + end_share_mesage);
});


app.get('/paste/new', function(req, res){
    var responseString = "";
    res.sendFile(__dirname + '/new.html');
});



app.get('/paste/edit', function(req, res){
    var id = req.query['id'];
    data = "";
    mysql_connection.getConnection(function(err,connection) {
        mysql_connection.query('select * from paste where id="' + id + '";', function(err, rows) { 
            if (!err)  {
                data = rows;
                if(data.length > 0) {
                    res.end(mini_begin_share_message + '<h3 class="ui-widget-header"> Edit Paste: ' + rows[0].id
                        + '<form action="/paste/submitedit" id="usrform">'
                        + '<p align=center>'
                        + '<b>Paste here: </b><br><br>'
                        + '<input type="hidden" name="id" value="' + rows[0].id + '">'
                        + '<textarea rows="20" cols="100" name="text" form="usrform">' + rows[0].item + '</textarea>'
                        + '<p align=center>'
                        + '<input type="submit"></form>'
                        + end_share_mesage);
                } else {
                   res.end(begin_share_message + '<h3 class="ui-widget-header">Error, paste does not exist!</h3>'+  end_share_mesage);
               }
           }else {
            data =  "An error has occurred.";
            console.log(err);
        }
        connection.release();
    });
});
});

app.post('/paste/search', function(req, res){
    var what = '%' + req.body.what + '%';
    var safe_search = mysql.escape(what);
    var responseString = "";
    res.write('<html>'
        + '<p align=left>'
        );
    
    mysql_connection.getConnection(function(err,connection) {
        mysql_connection.query("select * from paste where item like " + safe_search +  ";", function(err, rows) { 
            if (!err)  {
                data = rows;
            }else {
                data =  "An error has occurred.";
                console.log(err);
            }
            connection.release();
            
            for (var i in data){
                res.write(mini_begin_share_message + '<h3 class="ui-widget-header">Paste: <a href="' + site_name + '/show?id=' + data[i].id + '&Submit=View">' + data[i].id + '</a><a href="' + site_name + '/delete?id=' + data[i].id + '&Submit=View"><img src="/paste/delete.png" height="10" width="10"></a> <a href="' + site_name + '/edit?id=' + data[i].id + '&Submit=View"><img src="/paste/edit.png" height="10" width="10"></a></h3>' +  data[i].item + end_share_mesage);
            }
            res.end('</html>');
        });
    });

});

app.get('/paste/show', function(req, res){
    var id = req.query['id'];
    data = "";
    mysql_connection.getConnection(function(err,connection) {
        mysql_connection.query('select * from paste where id="' + id + '";', function(err, rows) { 
            if (!err)  {
                data = rows;
                if(data.length > 0) {
                    res.end(begin_share_message + '<h3 class="ui-widget-header">Viewing Paste: <a href="' + site_name + '/show?id=' + rows[0].id + '&Submit=View">' + rows[0].id + '</a><a href="' + site_name + '/delete?id=' + rows[0].id + '&Submit=View"><img src="/paste/delete.png" height="10" width="10"></a> <a href="' + site_name + '/edit?id=' + rows[0].id + '&Submit=View"><img src="/paste/edit.png" height="10" width="10"></a></h3>' +  rows[0].item + end_share_mesage);

                } else {
                   res.end(begin_share_message + '<h3 class="ui-widget-header">Error, paste does not exist!</h3>'+  end_share_mesage);
               }
           }else {
            data =  "An error has occurred.";
            console.log(err);
        }
        connection.release();
    });
    });
});

app.get('/paste/delete', function(req, res){
    var id = req.query['id'];
    data = "";
    mysql_connection.getConnection(function(err,connection) {
        mysql_connection.query('delete from paste where id="' + id + '";', function(err, rows) { 
            if (!err)  {
                data = rows;
                res.end(mini_begin_share_message + '<h3 class="ui-widget-header">Deleted paste:' + id + '</h3>'+  end_share_mesage);
            }else {
                data =  "An error has occurred while trying to delete the paste or request has been denied by policy.";
                res.end(JSON.stringify(data));
            }
            connection.release();
        });
    });
});

app.get('/paste/login', function(req, res){
    var responseString = "";
    res.sendFile(__dirname + '/login.html');
});


app.get('/', function(req, res){
    var responseString = "";
    res.sendFile(__dirname + '/index.html');
});

app.get('/paste/body', function(req, res){
    var data = "";
    var responseString = "";
     res.write('<html><body bgcolor="#f5f5f5">'
        + '<p align=left>'
        );
    mysql_connection.getConnection(function(err,connection) {
        mysql_connection.query('select * from paste order by num desc limit 10;', function(err, rows) { 
            if (!err)  {
                data = rows;
            }else {
                data =  "An error has occurred.";
                console.log(err);
            }
            connection.release();
            
            for (var i in data){
                res.write(mini_begin_share_message + '<h3 class="ui-widget-header">Paste: <a href="' + site_name + '/show?id=' + data[i].id + '&Submit=View">' + data[i].id + '</a><a href="' + site_name + '/delete?id=' + data[i].id + '&Submit=View"><img src="/paste/delete.png" height="10" width="10"></a> <a href="' + site_name + '/edit?id=' + data[i].id + '&Submit=View"><img src="/paste/edit.png" height="10" width="10"></a></h3>' +  data[i].item + end_share_mesage);
            }
            res.end('</html>');
        });
    });

});

app.get('/paste/new.html', function(req, res){
    res.sendFile(__dirname + '/new.html');
});

app.get('/paste/logo.png', function(req, res){
    res.sendFile(__dirname + '/logo.png');
});

app.get('/paste/dare.png', function(req, res){
    res.sendFile(__dirname + '/dare.png');
});


app.get('/paste/whats.png', function(req, res){
    res.sendFile(__dirname + '/whats.png');
});

app.get('/paste/delete.png', function(req, res){
    res.sendFile(__dirname + '/delete.png');
});

app.get('/paste/caring.png', function(req, res){
    res.sendFile(__dirname + '/caring.png');
});

app.get('/paste/edit.png', function(req, res){
    res.sendFile(__dirname + '/edit.png');
});

app.get('/paste/background.png', function(req, res){
    res.sendFile(__dirname + '/background.png');
});

app.get('/paste/search.html', function(req, res){
    res.sendFile(__dirname + '/search.html');
});

app.get('/paste/logo', function(req, res){
    res.sendFile(__dirname + '/logo.png');
});

app.get('/paste/from.png', function(req, res){
    res.sendFile(__dirname + '/logo.png');
});

server.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
