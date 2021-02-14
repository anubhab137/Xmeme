var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var memesRouter = require('./routes/memes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/memes', memesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo=db.db('test');
  var collName='data';
  dbo.listCollections({name: collName})
    .next(function(err, collinfo) {
        if (!collinfo) {
          dbo.createCollection(collName, function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
        });
      }
    });
  db.close();
});

module.exports = app;
