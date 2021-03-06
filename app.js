require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const GraphqlHTTP = require('express-graphql');
const { schema } = require('./graphql/schema');

/**
 * Definer base url
 * 
 * da jeg vil kunne deploye flere node backends på min server
 * bliver de nødt til, at anvende unikke baseurls.
 * for at denne backend skal fungere, så skal den vide
 * hvilken base url den benytter. Ellers vil der blive sendt 
 * et 404 response
 */
const baseUrl = process.env.BASE_URL

/**
 * Opret forbindelse til DB
 */
require('./dbSetup')();

/**
 * route managers (views/api-resorces)
 */
const viewRouteManager = require('./routes/view/viewRouteManager')
const apiRouteManager = require('./routes/api/apiRouteManager')

/**
 *  view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 *  other middleware
 */
app.use(logger('dev'));
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.json()); // to support JSON-encoded bodies
app.use(`${baseUrl}`, express.static(path.join(__dirname, 'public')));

/**
 * route middleware
 */
app.use(`${baseUrl}/`, viewRouteManager);
app.use(`${baseUrl}/api`, apiRouteManager);

/**
 * graphql middleware
 */
app.use(`${baseUrl}/graphql`, GraphqlHTTP({
  schema,
  graphiql: true
}));

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
