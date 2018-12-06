var mongoose = require('mongoose');
var debug = require('debug')('miniproject:dbsetup');
require('dotenv').config()

function connect(dbUriString) {
    debug(`connecting to ${process.env.DEV_DB_URI}`);
    const conStr = dbUriString ? dbUriString : process.env.DEV_DB_URI;
    // This returns a promise
    return mongoose.connect(conStr, { useNewUrlParser: true, useCreateIndex: true });
}
mongoose.connection.once('connected', function () {

});
mongoose.connection.once('error', function (err) {
    throw err
});

module.exports = connect;
