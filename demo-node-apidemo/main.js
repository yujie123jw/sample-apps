var http = require('http');
var express = require('express');
var request = require('request');
require('request-debug')(request);
var address = process.env.CLUSTER;
var user = process.env.username;
var password = process.env.password;
var auth_address = address.replace("api","auth");
var docker_address = address.replace("api.","");
var port = process.env.PORT;
var accesstoken = process.env.TOKEN;
var lineReader = require('line-reader');
var app = express();
var server = require("http").createServer(app);
var version = '0';

function getVersion(){
    var responseString = "";
    var options = {
        host: address,
        port: 80,
        path: '/v1/version',
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    var request = http.get(options, function(response){
        response.on('data', function(data) {
            responseString += data;
            var build_number = JSON.parse(responseString);
            return(build_number.build_number);
        });
    });
}

var defaultHTML = (
    '<html>'
    );

app.get('/hardtag', function(req, res) {
    var responseString = "";
    var second_responseString = "";
    var uuid = req.query['uuid'];
    var fqn = req.query['fqn'];
    var tag = req.query['tag'];
    var options = {  host: address,port: 80, path: '/v1/jobs/' + uuid, headers: { 'Authorization': 'Bearer ' + accesstoken } }
    res.write(defaultHTML);


    var get_request = http.get(options, function(response){
      response.on('data', function(data) {
        responseString += data;
    });

      response.on('end', function(data){
        responseString.state = '';
        var change_state = JSON.parse(responseString)
        change_state.scheduling_tags =  [ { 'type': 'hard', 'tag': tag, 'source': 'user'} ];
        change_state.state = 'stopped';
        var options = {
            url: 'http://' + address + '/v1/jobs/' + uuid,
            headers: {
                'Authorization': 'Bearer ' + accesstoken
            },
            body: JSON.stringify(change_state)
        }

        var stop = request.put(options, function(error, response, body) {
            res.write('Stopped Job');


            var options = {  uri: 'http://127.0.0.1:' + port + '/start?uuid=' + uuid + '&fqn=' + fqn};
            var start_app = request.get(options, function(error, response, body) {
               console.log('Response:' + error + '\n' + response + '\n\n' + body);
               res.end('<br>Started Job');
           });


        });
    });
  });

});

app.get('/stop', function(req, res) {
    var responseString = "";
    var uuid = req.query['uuid'];
    var fqn = req.query['fqn'];
    var options = {  host: address,port: 80, path: '/v1/jobs/' + uuid, headers: { 'Authorization': 'Bearer ' + accesstoken } }
    res.write(defaultHTML);

    var get_request = http.get(options, function(response){
        response.on('data', function(data) {
            responseString += data;
        });
        response.on('end', function(data){
            responseString.state = '';
            var change_state = JSON.parse(responseString)
            change_state.state = 'stopped';
            var options = {
                url: 'http://' + address + '/v1/jobs/' + uuid,
                headers: {
                    'Authorization': 'Bearer ' + accesstoken
                },
                body: JSON.stringify(change_state)
            }

            var stop = request.put(options, function(error, response, body) {
               res.end('Stopped Job');
           });
        });
    });
});

app.get('/createdocker', function(req, res) {
    var dockername = req.query['dockername'];
    var dockerimage = req.query['dockerimage'];
    var sandbox = req.query['sandbox'];
    var uuid = "";
        //var exposedport = req.query['exposedport'];
        var startcommand = req.query['startcommand'];
        var body =  {
            "allow_egress": true,
            "env": {},
            "exposed_ports": [],
            "image_url":"https://index.docker.io/" + dockerimage + ":latest",
            "job_fqn": "job::" + sandbox + "::" + dockername,
            "resources": {
                "cpu":0,
                "disk":1073741824,
                "memory":268435456,
                "netmax":0,
                "network":5000000
            },
            "restart_config":{
                "maximum_attempts":0,
                "restart_mode":"no"
            },
            "routes": {},
            "start":true,
            "start_command":[
            startcommand
            ]
        };

        res.write(defaultHTML);
        res.write('Creating Docker Job.............');

        var options = {
            url: 'http://' + address + '/v1/jobs/docker',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        request(options, function(error, response, body) {
            if (response.statusCode != "200") {
                res.end("<br><br>An error has occurred. ");
            } else {
                var location = JSON.parse(body);
                if (!location.location) {
                    res.end("<br><br>An error has occurred.");
                } else {
                    var parse1 = location.location;
                    uuid = parse1.replace("http://" + address, "");

                    res.end(
                        '<form action="/viewtask" method="get">'
                        + '<input type="hidden" name="app" value="' + dockername + '">'
                        + '<input type="hidden" name="uuid" value="' + uuid + '">'
                        + '<br><br>'
                        + 'Click View to check application status. '
                        + '<br><br>'
                        + '<input type="submit" value="View"'
                        + ' name="Submit" id="frm1_view" />'
                        + '</form>'
                        );
                }
            }

        }).on('error', function(e) {
            console.log("Got error 2 : " + e.message);
        });
    });

app.get('/viewtask', function(req, res){
    var dockername = req.query['app'];
    var responseString = "";
    var uuid = req.query['uuid'];
    var options = {
        host: address,
        port: 80,
        path: uuid,
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    var stop = 1;

    var request = http.get(options, function(response){
        response.on('data', function(data) {
            responseString += data;
        });
        response.on('end', function(data){
            var jobs = JSON.parse(responseString);
            if (jobs.state == "complete" || jobs.state == "stopped"){
                res.write(defaultHTML);
                res.end(
                    '<form action="/viewjob" method="get">'
                    + '<input type="hidden" name="app" value="' + dockername + '">'
                    + 'Application is running. Click View to check application status. <br><br> '
                    + '<input type="submit" value="View"'
                    + ' name="Submit" id="frm1_view" />'
                    + '</form>'
                    );
            } else {
                res.write(defaultHTML);
                res.end(
                    '<form action="/viewtask" method="get">'
                    + '<input type="hidden" name="app" value="' + dockername + '">'
                    + '<input type="hidden" name="uuid" value="' + uuid + '">'
                    + '<br><br>'
                    + 'Your Application is not ready yet. Click View again to check application status. '
                    + '<br><br>'
                    + '<input type="submit" value="View"'
                    + ' name="Submit" id="frm1_view" />'
                    + '</form>'
                    );
            }
        });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});
});

app.get('/start', function(req, res) {
    var responseString = "";
    var uuid = req.query['uuid'];
    var fqn = req.query['fqn'];
    var options = {
        host: address,
        port: 80,
        path: '/v1/jobs/' + uuid,
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    res.write(defaultHTML);

    var get_request = http.get(options, function(response){
        response.on('data', function(data) {
            responseString += data;
        });
        response.on('end', function(data){
            responseString.state = '';
            var change_state = JSON.parse(responseString)
            change_state.state = 'started';
            var options = {
                url: 'http://' + address + '/v1/jobs/' + uuid,
                headers: {
                    'Authorization': 'Bearer ' + accesstoken
                },
                body: JSON.stringify(change_state)
            }

            var stop = request.put(options, function(error, response, body) {
                res.end('Started Job');
            });
        });
    });
});

app.get('/delete', function(req, res) {
    var app = req.query['app'];
    var responseString = "";
    var uuid = req.query['uuid'];
    var package_uuid = '';
    var fqn = req.query['fqn'];
    var data = {
        fqn: fqn,
        state: 'stopped'
    };
    var options = {
        host: address,
        port: 80,
        path: '/v1/packages?name=' + app,
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    var package_request = http.get(options, function(response){
        response.on('data', function(data) {
            responseString += data;
        });
        response.on('end', function(data){
            var packageuuidparse = JSON.parse(responseString);
            for (var i = 0; i < packageuuidparse.length; i++){
                if(packageuuidparse[i].name == app) {
                    package_uuid = packageuuidparse[i].uuid;
                }
            }
            options = {
                uri: 'http://' + address + '/v1/packages/' + package_uuid,
                headers: {
                    'Authorization': 'Bearer ' + accesstoken
                }
            }
            var deletePackage = request.del(options, function(error, response, body) {});
        });
    });

    options = {
        uri: 'http://' + address + '/v1/jobs/' + uuid,
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    var deleteJob = request.del(options, function(error, response, body) {});
    res.write(defaultHTML);
    res.end('Deleted Package and Job');
});

app.get('/getjobs', function(req, res) {
    res.write(defaultHTML);
    res.write("<p align=left><b>All Running Jobs</b><br><br></p>");
    var responseString = "";
    var options = {
        host: address,
        port: 80,
        path: '/v1/jobs',
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    var request = http.get(options, function(response){
        response.on('data', function(data) {
            responseString += data;
        });
        response.on('end', function(data){
           var jobs = JSON.parse(responseString);
           res.write('<ul>');
           for (var i = 0; i < jobs.length; i++){
            res.write(
                '<li><b>Job Name: </b><a href="/viewjob?app='
                + jobs[i].name
                + '&Submit=View">'
                + jobs[i].name
                + '</a> <b> Status: </b>' + jobs[i].state + '</li>'
                );
        }
        res.end('</ul>');
        request.end();
    });
    });
});

app.get('/migrate', function(req, res){
   var app = req.query['app'];
   var tag = req.query['tag'];
   var responseString = "";
   var uuid = "";
   var url = "";
   var fqn = "";

   var options = {
    host: address,
    port: 80,
    path: '/v1/jobs',
    headers: {
        'Authorization': 'Bearer ' + accesstoken
    }
}


var get_request = http.get(options, function(response){
    response.on('data', function(data) {
        responseString += data;
    });
    response.on('end', function(data){
        var jobs = JSON.parse(responseString);
        for (var i = 0; i < jobs.length; i++){
         if(jobs[i].name == app) {
             uuid = jobs[i].uuid;
             fqn = jobs[i].fqn;
             state = jobs[i].state;
             if(jobs[i].ports) {
                if(   url = jobs[i].ports[0].routes){
                    url = jobs[i].ports[0].routes[0].endpoint;
                }
            }
        }
    }

    res.write(defaultHTML);

    if(uuid.length < 10) {
        res.end("Error, Application not found!");
    } else {
     var options = {  uri: 'http://127.0.0.1:' + port + '/hardtag?uuid=' + uuid + '&fqn=' + fqn + '&tag=' + tag};
     var start_app = request.get(options, function(error, response, body) {
         console.log('Migration request complete');
     });
 }
});
});
});

app.get('/viewjob', function(req, res){
    var app = req.query['app'];
    var responseString = "";
    var uuid = "";
    var tag = "";
    var url = "";
    var fqn = "";
    var responseString = "";
    var state = "";
    var responseString = "";
    var options = {
        host: address,
        port: 80,
        path: '/v1/jobs',
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    var request = http.get(options, function(response){
        response.on('data', function(data) {
            responseString += data;
        });
        response.on('end', function(data){
            var jobs = JSON.parse(responseString);
            for (var i = 0; i < jobs.length; i++){
             if(jobs[i].name == app) {
                 uuid = jobs[i].uuid;
                 fqn = jobs[i].fqn;
                 state = jobs[i].state;
                 if(jobs[i].ports) {
                    if(   url = jobs[i].ports[0].routes){
                        url = jobs[i].ports[0].routes[0].endpoint;
                    }
                }
                if(jobs[i].scheduling_tags) {
                    tag = jobs[i].scheduling_tags[0].tag;
                }
            }
        }

        res.write(defaultHTML);

        if(uuid.length < 10) {
            res.end("Error, Application not found!");
        } else {
            res.end(
                '<b>Application Details:</b>'
                + '<br><br>Job Name: ' + app
                + ' <br><br>Job UUID: ' + uuid
                + '<br><br>FQN: ' + fqn
                + '<br><br>Application State: ' + state
                + '<br><br>URL: <a href="http://' + url + '" target="_blank">Connect </a>'
                + '<br><br>Tag: ' + tag
                + '<p align=left>'
                + '<br><b>Application Options</b><br><br>'
                + '<form action="/start">'
                + '<input type="hidden" name="uuid" value="' + uuid + '"/>'
                + '<input type="hidden" name="fqn" value="' + fqn + '"/>'
                + '<input type="submit" value="Start Job"/>'
                + '</form>'
                + '<form action="/stop">'
                + '<input type="hidden" name="uuid" value="' + uuid + '"/>'
                + '<input type="hidden" name="fqn" value="' + fqn + '"/>'
                + '<input type="submit" value="Stop Job"/>'
                + '</form>'
                + '<form action="/delete">'
                + '<input type="hidden" name="uuid" value="' + uuid + '"/>'
                + '<input type="hidden" name="app" value="' + app + '"/>'
                + '<input type="hidden" name="fqn" value="' + fqn + '"/>'
                + '<input type="submit" value="Delete Job"/>'
                + '</form>'
                + 'Set a hard tag: ' 
                + '<form action="/hardtag">'
                + '<input type="hidden" name="uuid" value="' + uuid + '"/>'
                + '<input type="hidden" name="fqn" value="' + fqn + '"/>'
                + '<input type="text" name="tag" value=""/>'
                + '<input type="submit" value="Set Hard Tag"/>'
                + '</form>'

                + '</body></html>'
                );
}
});
});
});


app.get('/version', function(req, res) {
    var responseString = "";
    var options = {
        host: address,
        port: 80,
        path: '/v1/version',
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    var request = http.get(options, function(response){
        response.on('data', function(data) {
            responseString += data;
        });

        response.on('end', function(error,data) {
            res.write(defaultHTML);
            var build_number = JSON.parse(responseString);
            if (!build_number.build_number) {
                res.end('<br><br>An error occurred when trying to get the version number.<br><br>');
            } else {
                res.write("<p align=left>Apcera Version: ");
                res.write(build_number.build_number);
                res.end("</p>");
            }
        });
    });
});

app.get('/oauth2', function(req,res){
    var responseString = "";
    var options = {
        host: auth_address,
        port: 80,
        path: '/v1/oauth2/device/google/getcode'
    }
    var request = http.get(options, function(response){
        response.on('data', function(data){
           responseString += data;
       });
        response.on('end', function(data){
          var authResponse = JSON.parse(responseString);
          res.write(defaultHTML);
          res.end(
            'Please enter code: <b>' + authResponse.user_code
            + '</b> to authenticate with <a target="_blank" href="'
            + authResponse.verification_url + '">Google</a>'
            + '<br><br>'
            + '<form action="/transfertoken">'
            + '<input type="hidden" name="devicecode" value="' + authResponse.device_code + '">'
            + '<br><br>'
            + '<input type="submit" value="Finish"/>'
            + '</form>'
            );
      });
    });
});

app.get('/transfertoken', function(req, res) {
    var devicecode = req.query['devicecode'];
    var startcommand = req.query['startcommand'];
    var refresh_token = "";
    var responseString = "";
    var body =  {
        "device_code": devicecode
    };

    res.write(defaultHTML);
    var options = {
        url: 'http://' + auth_address + '/v1/oauth2/device/google/redeemed',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    request(options, function(error, response, body) {
        var get_token = JSON.parse(body);
        var redeem_body = {
            "refresh_token": get_token.refresh_token,
            "token_type": "GOOGLE_REFRESH"
        }
        var options = {
            url: 'http://' + auth_address + '/v1/oauth2/device/google/refresh',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(redeem_body)
        }
        var redeem_token = request(options, function(error, response, body) {
            var get_bearer = JSON.parse(body);
            accesstoken = get_bearer.access_token;
            res.end("Login Complete");
        });
    });
});

app.get('/login', function(req, res){
    var get_user = req.query['username'];
    var get_pass = req.query['password'];
    if (get_user == user)  {
        if (get_pass == password){
          res.end('<html>'
            + '<title>Apcera Platform API Demonstration</title>'
            + '<head>'
            + '<link rel="icon"' 
            + 'type="image/png"'
            + 'href="https://www.apcera.com/sites/default/files/favicon-32x32.png">'
            + '<p align=center><a href="/"><img src="/logo.png"></a></p>'
            + '</head>'
            + '<body>'
            + '<p align=center>'
            + '<b>The Apcera Platform API Demonstration in Node JS<b><br><br>'
            + '<table style="width:10%">'
            + '<tr>'
            + '<td><form action="/getjobs" method="get" target="iframe_a">'
            + '<input type="submit" value="List all jobs" name="Submit" id="frm1_jobs"/>'
            + '</form></td>'
            + '<td><form action="/version" target="iframe_a">'
            + '<input type="submit" value="Cluster Version"/>'
            + '</form></td>'
            + '<td><form action="/docker" target="iframe_a">'
            + '<input type="submit" value="Run Docker"/>'
            + '</form></td>'
            + '<td><form action="/oauth2" target="iframe_a">'
            + '<input type="submit" value="Google Auth"/>'
            + '</form></td></tr></table>'
            + '<IFRAME SRC="/body" name="iframe_a" WIDTH=1200 HEIGHT=1000></html>');
} else {
    res.end('<html>'
        + '<title>Access Denied</title>'
        + '<head>'
        + '<link rel="icon"' 
        + 'type="image/png"'
        + 'href="https://www.apcera.com/sites/default/files/favicon-32x32.png">'
        + '<p align=center><a href="/"><img src="/logo.png"></a></p>'
        + '</head>'
        + '<body><p align=center> Invalid Login!</p></body</html>');
}
} else {
   res.end('<html>'
    + '<title>Access Denied</title>'
    + '<head>'
    + '<link rel="icon"' 
    + 'type="image/png"'
    + 'href="https://www.apcera.com/sites/default/files/favicon-32x32.png">'
    + '<p align=center><a href="/"><img src="/logo.png"></a></p>'
    + '</head>'
    + '<body><p align=center> Invalid Login!</p></body</html>');
}
});


app.get('/docker', function(req, res){
    var responseString = "";
    res.write(defaultHTML);
    res.end(
        '<p><b>Docker Container Wizard</b></p><br>'
        + '<form action="/createdocker" method="get">'
        + 'Name for Application: '
        + '<input type="text" name="dockername" value="mysqltest">'
        + '<br><br>'
        + 'Sandbox to run Application: '
       // + '<input type="text" name="sandbox" value="/sandbox/demo" readonly>'
       + '<input type="text" name="sandbox" value="/sandbox/demo">'
       + '<br><br>'
       + 'Docker Hub image to run: '
       + '<input type="text" name="dockerimage" value="rusher81572/mysql">'
       + '<br><br>'
                //+ 'Exposed Port: '
                //+ '<input type="text" name="exposedport" value="3306">'
                //+ '<br><br>'
                + 'Start Command: '
                + '<input type="text" name="startcommand" value="/start.sh">'
                + '<br><br>'
                + '<input type="submit" value="Create"'
                + '<name="Create" id="frm1_view" />'
                + '</form>'
                + '</body></html>'
                );
});

app.get('/', function(req, res){
    var responseString = "";
    res.sendFile(__dirname + '/index.html');
});

app.get('/body', function(req, res){
    var responseString = "";
    res.end(defaultHTML);
});

app.get('/logo.png', function(req, res){
    res.sendFile(__dirname + '/logo.png');
});

server.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
