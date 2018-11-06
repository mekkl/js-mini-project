var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

/**
 * Opret forbindelse til DB
 */
require('./dbSetup')();

/**
 * Importer routes
 * TODO: Ligesom en api route manager, opret en view route managager
 */
var indexRouter = require('./routes/index')
var apiRouteManager = require('./routes/api/apiRouteManager')

var app = express();

/**
 *  view engine setup
 */ 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
app.use('/', indexRouter);
app.use('/api', apiRouteManager);

/**
 *  catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 *  error handler
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
