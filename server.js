const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const path = require('path');

// set up express app
const app = express();
app.use(express.static(path.join(__dirname, 'client/build')))

// connect to mongodb
mongoose.connect('mongodb://localhost/classicmodels');
mongoose.Promise = global.Promise;

//set up static files
// app.use(express.static('public'));

// Enable cross origin requests
app.use(cors())

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests on port 4000');
});
