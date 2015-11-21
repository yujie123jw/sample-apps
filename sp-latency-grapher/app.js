'use strict';

var express = require('express'),
    moment  = require('moment'),
    _       = require('underscore'),
    app     = express();

var port = process.env.PORT || 9000;
var dist = process.env.DIST || 'static';

app.use(express.static(dist));
app.use(express.bodyParser()); // for POSTs
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});
app.use(express.json());

// Make a ring buffer in memory to store the few minutes
// of Latency data.
var newRing = function(capacity) {
  var pos = 0, buffer = [];
  return {
    get: function(i) { return buffer[i] },
    push: function(val) {
      buffer[pos] = val;
      pos = (pos+1) % capacity;
    },
    values: function() {
      var ordered = [];
      var p = pos;
      for (var i = p; i < p + capacity; i++) {
        var val = buffer[i % capacity];
        if (typeof val !== "undefined") {
          ordered.push(val);
        }
      };
      return ordered;
    }
  };
};

var BUFFER_SIZE = 1024,
  nanosecRe = /(\.\d{3})\d*Z/,
  ring = newRing(BUFFER_SIZE);

var latencyData = function(values, min, max, units) {
  var d = _.filter(values, function(instant) {
    var m = moment(instant.date)
    if (m.isSame(min) || m.isSame(max)) {
      return true;
    }
    return m.isAfter(min) && m.isBefore(max);
  })
  var i = values.length - d.length - 1
  if (i > -1) {
    d.unshift(values[i])
  };

  if (d.length < 2) { return []; }
  return d;
}

var logLatency = function(req, res) {
  var b = req.body;
  var instant = {
    date: b.ReceivedTime.replace(nanosecRe, '$1Z'),
    Command: b.Command,
    PreHookLatency: b.PreHookLatency,
    HookTotalLatency: b.HookTotalLatency,
    ServerResponseLatency: b.ServerResponseLatency,
    ThisFrameLatency: b.ThisFrameLatency,
    TotalLatency: b.TotalLatency,
  };
  console.log(instant)
  for (var i = b.HookLatencies.length - 1; i >= 0; i--) {
    var lat = b.HookLatencies[i];
    instant["Hook: " + lat.Hook] = lat.Latency;
  };
  ring.push(instant);
  res.send();
}

app.post('/log', logLatency);

app.get('/data/:duration?/:units?', function(req, res) {
  var duration = req.params.duration || 1,
    units = req.params.units || 'minutes';

  var max = moment().utc().milliseconds(0);
  var min = moment(max).subtract(+duration, units);
  var data = latencyData(ring.values(), min, max, units);
  var ret = {"max": max, "min": min}
  ret.data = data
  if (ret.data.length < 2) {
    ret.data = [{date: min, TotalLatency: 0}, {date: max, TotalLatency: 0}];
  }
  res.json(ret);
});

// Catch all at the end of the routes.
app.get('/*', function(req, res) {
  res.sendfile('index.html', { root: dist });
});

// Start listening after all set up.
var server = app.listen(port, function(){
  console.log('Listening on port: ' + port);
});
