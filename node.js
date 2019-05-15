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
    mysql.pool.query("SELECT * FROM rcdb_coaster", function(err, rows, fields) {
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
    mysql.pool.query("SELECT * FROM rcdb_features", function(err, rows, fields) {
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

/* Listen on port and display message to indicate listening */
app.listen(app.get('port'), function(){
    console.log('Express started at http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press ctrl-C to terminate.');
});