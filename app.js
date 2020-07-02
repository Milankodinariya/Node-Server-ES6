'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const pkg = require('./package.json');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.get('/', (req, res) => {
  res.status(200).send({
    service: 'SKC Brackets API',
    version: pkg.version
  });
});

app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/login'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Route Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  const status = err.status || 500;

  res.status(status);
  res.json({ error: err.message, statusCode: status });
  next();
});

module.exports = app;
