const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const user = require('./api/user/user');
const contract = require('./api/contract/contract');
const file = require('./api/file/file');
const mailing = require('./api/mailing/mailing');
const transaction = require('./api/transaction/transaction');

const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connect successfully');
});
mongoose.connect('mongodb://localhost/mongodb_tutorial', { useMongoClient: true });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', user);
app.use('/contract', contract);
app.use('/file', file);
app.use('/file_content', express.static(path.join(__dirname, 'uploads')));
app.use('/mailing', mailing);
app.use('/transaction', transaction);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
