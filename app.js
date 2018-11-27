var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

/**
 * Definer base url
 * 
 * da jeg vil kunne deploye flere node backends på min server
 * bliver de nødt til, at anvende unikke baseurls.
 * for at denne backend skal fungere, så skal den vide
 * hvilken base url den benytter. Ellers vil der blive sendt 
 * et 404 response
 */
const baseUrl = '/node'

/**
 * Opret forbindelse til DB
 */
require('./dbSetup')();

/**
 * route managers (views/api-resorces)
 */
var viewRouteManager= require('./routes/view/viewRouteManager')
var apiRouteManager = require('./routes/api/apiRouteManager')

/**
 *  view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 *  other middleware
 */
app.use(logger('dev'));
app.use(express.json());
app.use(`${baseUrl}`, express.static(path.join(__dirname, 'public')));

/**
 * route middleware
 */
app.use(`${baseUrl}/`, viewRouteManager);
app.use(`${baseUrl}/api`, apiRouteManager);

/**
 *  catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 *  error handler
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
