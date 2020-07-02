import express from "express"
const bodyParser = require('body-parser');
const app        = express();
const morgan     = require('morgan');
const cors       = require('cors')

app.use(morgan('dev')); // log requests to the console

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const port     = process.env.PORT || 8080; // set our port

// DATABASE SETUP
const mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/database'); // connect to our database

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

    res.json({ message: 'hooray! welcome to our api!' });

});
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/login'));
app.use('/api/candidate', require('./routes/candidate'));
app.use('/api/employee', require('./routes/employee'));

app.listen(port);
console.log('Magic happens on port ' + port);
