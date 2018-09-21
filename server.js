// BASE SETUP
// =============================================================================
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');

// Server configuration
let config = require('./config'); //we load the db location from the JSON files
let port = process.env.HTTP_PORT || config.port;
let mode = process.env.NODE_ENV || 'development';

console.log(`RUNNING SERVER IN [${mode}] MODE`);

// API endpoints
let ChampionsAPI = require('./app/routes/v1/champion');

// db connection
mongoose.connect(`${config.database}_${mode}`, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// don't show the log when in test env
if(process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// ROUTES FOR OUR API
// =============================================================================
v1 = express.Router();
v1.use('/champions', ChampionsAPI);

// default to v1
app.use('/api', v1);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing