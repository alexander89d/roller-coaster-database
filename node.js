/* To start forever: ./node_modules/forever/bin/forever start node.js [port_number] */
/* To stop forever: ./node_modules/forever/bin/forever stop node.js */

/* set up express */
var express = require('express');
var app = express();

/* set up body-parser */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* set up MySQL using dbcon.js file  */
var mysql = require('./dbcon.js');

/* set port number based on command-line input */
app.set('port', process.argv[2]);

/* Create route to allow acces from client-side UI */
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://web.engr.oregonstate.edu');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});

/* Create route to send JSON string of all coaster table data to client making request. */
app.get('/select-all-coasters', function displayData(req, res, next) {   
    mysql.pool.query("SELECT c.id, c.name, p.name AS park, m.name AS manufacturer, c.year_opened, c.height, c.max_speed, c.in_operation FROM rcdb_coaster c LEFT JOIN rcdb_park p ON c.park = p.id LEFT JOIN rcdb_manufacturer m ON c.manufacturer = m.id ORDER BY c.name ASC", function(err, rows, fields) {
        if (err) {
           next(err);
           return;
        }
        var results = JSON.stringify(rows);
        
        /* Send JSON data back to the client that requested it. */
        res.type("application/json");
        res.send(results);
    });
});

/* Create route to send JSON string of coaster search results data to client making request. */
app.get('/search-coasters', function displayData(req, res, next) {   
    mysql.pool.query("SELECT c.id, c.name, p.name AS park, m.name AS manufacturer, c.year_opened, c.height, c.max_speed, c.in_operation FROM rcdb_coaster c LEFT JOIN rcdb_park p ON c.park = p.id LEFT JOIN rcdb_manufacturer m ON c.manufacturer = m.id WHERE c.name = ? ORDER BY c.name ASC", [req.query.name], function(err, rows, fields) {
        if (err) {
           next(err);
           return;
        }
        var results = JSON.stringify(rows);
        
        /* Send JSON data back to the client that requested it. */
        res.type("application/json");
        res.send(results);
    });
});

/* Create route to send JSON string of all feature table data to client making request. */
app.get('/select-all-features', function displayData(req, res, next) {   
    mysql.pool.query("SELECT * FROM rcdb_features ORDER BY name ASC", function(err, rows, fields) {
        if (err) {
           next(err);
           return;
        }
        var results = JSON.stringify(rows);
        
        /* Send JSON data back to the client that requested it. */
        res.type("application/json");
        res.send(results);
    });
});

/* Create route to send JSON string of all park table data to client making get request. */
app.get('/select-all-parks', function displayData(req, res, next) {   
    mysql.pool.query("SELECT P.id, P.name, P.city, P.state_province, P.country, PO.name AS owner FROM rcdb_park P INNER JOIN rcdb_park_owner PO ON PO.id = P.owner ORDER BY P.name ASC", function(err, rows, fields) {
        if (err) {
           next(err);
           return;
        }
        var results = JSON.stringify(rows);
        
        /* Send JSON data back to the client that requested it. */
        res.type("application/json");
        res.send(results);
    });
});

/* Create route to send JSON string of all park table data to client making get request. */
app.get('/select-all-manufacturers', function displayData(req, res, next) {   
    mysql.pool.query("SELECT * FROM rcdb_manufacturer ORDER BY name ASC", function(err, rows, fields) {
        if (err) {
           next(err);
           return;
        }
        var results = JSON.stringify(rows);
        
        /* Send JSON data back to the client that requested it. */
        res.type("application/json");
        res.send(results);
    });
});

/* Create route to send JSON string of all manufacturers table data to client making request. */
app.post('/select-all-manufacturers',function(req, res, next){
    var context = {};
    mysql.pool.query('SELECT * FROM rcdb_manufacturer ORDER BY name ASC', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }

      context.results = JSON.stringify(rows);
      res.send(context);
   });
});

/* Create route to send JSON string of all owners table data to client making request. */
app.post('/select-all-owners',function(req, res, next){
    var context = {};
    mysql.pool.query('SELECT * FROM rcdb_park_owner ORDER BY name ASC', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }

      context.results = JSON.stringify(rows);
      res.send(context);
   });
});


/* Create route to send JSON string of all owners table data to client making request. */
app.post('/select-all-parks',function(req, res, next){
    var context = {};
    mysql.pool.query('SELECT P.id, P.name, P.city, P.state_province, P.country, PO.name AS owner FROM rcdb_park P INNER JOIN rcdb_park_owner PO ON PO.id = P.owner ORDER BY P.name ASC', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }

      context.results = JSON.stringify(rows);
      res.send(context);
   });
});

app.get('/delete-park',function(req,res, next){
  context = {};
  let submittedId = [req.query.id];
  mysql.pool.query('DELETE FROM rcdb_park WHERE id=?', submittedId , function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    res.send(context);
  });
});

/* Create route to add new coaster with a park to the databse */
app.post('/add-coaster-with-park', function addFeature(req, res, next) {
    mysql.pool.query("INSERT INTO rcdb_coaster (name, park, manufacturer, year_opened, height, max_speed, in_operation) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.body.nameIn, req.body.parkIn, req.body.manufacturerIn, req.body.yearOpenedIn, req.body.heightIn, req.body.maxSpeedIn, req.body.inOperationIn], function(err, result) {
        if (err) {
            next(err);
            return;
        }
        res.end();
    });
});

/* Create route to add new coaster without a park to the databse */
app.post('/add-coaster-no-park', function addCoasterNoPark(req, res, next) {
    mysql.pool.query("INSERT INTO rcdb_coaster (name, manufacturer, year_opened, height, max_speed, in_operation) VALUES (?, ?, ?, ?, ?, ?)", [req.body.nameIn, req.body.manufacturerIn, req.body.yearOpenedIn, req.body.heightIn, req.body.maxSpeedIn, req.body.inOperationIn], function(err, result) {
        if (err) {
            next(err);
            return;
        }
        res.end();
    });
});

/* Create route to add new feature to the database */
app.post('/add-feature', function addFeature(req, res, next) {
    mysql.pool.query("INSERT INTO rcdb_features (name) VALUES (?)", [req.body.nameIn], function(err, result) {
        if (err) {
            next(err);
            return;
        }
        res.end();
    });
});

app.get('/add-owner',function(req,res,next){
  var context = {};
 
  var params = [req.query.name, req.query.city, req.query.state, req.query.country];

  mysql.pool.query("INSERT INTO rcdb_park_owner (name, city, state_province, country) VALUES (?, ?, ?, ?)", params, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.entryAdded = JSON.stringify(result.affectedRows);
    res.send(context);
  });
});

app.get('/add-manufacturer',function(req,res,next){
  var context = {};
 
  var params = [req.query.name, req.query.city, req.query.state, req.query.country];

  mysql.pool.query("INSERT INTO rcdb_manufacturer (name, city, state_province, country) VALUES (?, ?, ?, ?)", params, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.entryAdded = JSON.stringify(result.affectedRows);
    res.send(context);
  });
});


/* Create route to send JSON string of all owner names and their id's */
app.post('/select-owner-names-ids',function(req, res, next){
    var context = {};
    mysql.pool.query('SELECT name, id FROM rcdb_park_owner ORDER BY name ASC', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }

      context.results = JSON.stringify(rows);
      res.send(context);
   });
});


// function route to add a new park to the database
app.get('/add-park',function(req,res,next){
  var context = {};
 
  var params = [req.query.name, req.query.city, req.query.state, req.query.country, req.query.owner];

  mysql.pool.query("INSERT INTO rcdb_park (name, city, state_province, country, owner) VALUES (?, ?, ?, ?, ?)", params, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.entryAdded = JSON.stringify(result.affectedRows);
    res.send(context);
  });
});



/* Listen on port and display message to indicate listening */
app.listen(app.get('port'), function(){
    console.log('Express started at http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press ctrl-C to terminate.');
});