const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { db } = require('../models')

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')))

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.send(
    'Something is wrong' + err.message
  );
});

app.listen(3000, () => {
  console.log('listening on 3000 ...');
  db.sync()
    .then(() => {
      console.log('Synchronated the database')
    })
    .catch(err => {
      console.error('There is an error', err, err.stack)
    })
});

