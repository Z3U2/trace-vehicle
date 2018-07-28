/*eslint-disable unknown-require */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const env = require('./env.json')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

// using globel promises
mongoose.Promise = global.Promise


// initialize RT db connection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: env.RTDatabaseURL
});

// initialize mongo db connection
mongoose.connect(env.MongoDatabaseURL)
  .then(() => { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/trace-vehicle-dev`) })
  .catch(() => { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/trace-vehicle-dev`) })


// Database references
const timeRef = admin.database().ref('current-time');
const dataRef = admin.database().ref('data');
const immovableDataRef = admin.database().ref('immovable_data');

// Router class
const {ApiRoute} = require('./routes/api.route');
const api = new ApiRoute(dataRef,immovableDataRef).router;

// Library classes
const {HeartBeat} = require('./heart_beat.js');

// Instantiate hearbeat
new HeartBeat(timeRef);

// CORS Handling
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});



// Body parser middleware,
// necessary to parsing the data to the request body
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

//dev log 
app.use(morgan('dev'));

app.use('/api', api);

//Listening on PORT 3000
app.listen(3000);
console.log("listening on port 3000")