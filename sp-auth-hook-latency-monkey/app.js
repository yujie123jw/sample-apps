var express = require('express');
var app = express();
app.use(express.bodyParser());

app.get('/auth', function(req, res) { res.json({alive: "true"}) });
app.post('/auth', function(req, res) {
  // pick a random amount of time between 100ms and 1s
  latency = Math.floor(Math.random() * 900) + 100;
  setTimeout(function() {
    res.json({ Permitted: true, Reason: "Moving along after "+latency+"ms." })
  }, latency);
});

// get the port from environment, or default to 4000
var port = process.env.PORT || 4000
app.listen(port);

// put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:"+port+"/");
