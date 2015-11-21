var express = require('express');
var app = express();
app.use(express.bodyParser());

app.post('/auth', function(req, res) {
  if (req.body.Command.match(/DROP/i) || req.body.Command.match(/DELETE/i)) {
    // reject all drop and delete commands
    res.json({ Permitted: false, Reason: "No!" })
  } else {
    // permit anything else
    res.json({ Permitted: true, Reason: "Move along" })
  }
});

// get the port from environment, or default to 4000
var port = process.env.PORT || 4000
app.listen(port);

// put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:"+port+"/");
