var pg = require('pg') // import the node pg module
    _  = require('underscore');

// pg config, locally it's tcp://USERNAME@localhost:5432/tododb

var pgConString = process.env.POSTGRES_URI;

if (typeof pgConString !== "undefined") {
  var pgClient = new pg.Client(pgConString); // initialize the node-postgres client

  // connect to postgres
  pgClient.connect(function(err) {
    if (err) {
      console.log('postgres connection error: ', err)
    }
  });


  exports.createTables = function(req, res) {
    pgClient.query('CREATE TABLE tasks (title text, completed boolean);', function(err, result) {
      if (err) {
        console.log('PGcreateTables error: ', err);
        res.send(err);
      } else {
        console.log('PGcreateTables result: ', result);
        res.send(result);
      }
    });
  }


  exports.showTables = function(req, res) {
    pgClient.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", function(err, result) {
      if (err) {
        console.log('PGshowTables error: ', err);
        res.send(err);
      } else{
        console.log('PGshowTables result: ', result);
        res.send(result);
      }
    });
  }

  exports.showTasks = function(req, res) {
    pgClient.query('SELECT title, completed FROM tasks;', function(err, result) {
      if (err) {
        console.log('PGshowTasks error: ');
        console.log(err);
        res.send(err);
      } else {
        console.log('PGshowTasks result: ', result);
        res.send(result);
      }
    });
  }

  exports.deleteTables = function(req, res) {
    pgClient.query("DROP TABLE tasks;", function(err, result) {
      if (err) {
        console.log('PGdeleteTables error: ', err);
        res.send(err);
      } else {
        console.log('PGdeleteTables result: ', result);
        res.send(result);
      }
    });
  }

  exports.addTask = function(req, res) {
    // console.log('request body full: ', req.body);
    var taskArray = req.body;
    taskValues = _.map(taskArray, function(task) {
      var valueTitle = "'" + task.title + "'",
          valueCompleted = "'" + task.completed + "'";
          return "(" + valueTitle + ", " + valueCompleted + ")";
    });
    var qs = 'INSERT into tasks (title, completed) VALUES ' + taskValues.join() + ";"
    console.log(qs);
    pgClient.query(qs, function(err, result) {
      if (err) {
        console.log('PGaddTask error: ', err);
        res.send(err);
      } else {
        console.log('PGaddTask result: ', result);
        res.send(result);
      }
    });
  }

  exports.deleteRows = function(req, res) {
    pgClient.query("DELETE FROM tasks;", function(err, result) {
      if (err) {
        console.log('PGdeleteRows error: ', err);
        res.send(err);
      } else {
        console.log('PGdeleteRows success: ', result);
        res.send(result);
      }
    });
  }
}
