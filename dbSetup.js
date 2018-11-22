var mongoose = require('mongoose');
const dbURI = require("./settings").DEV_DB_URI;
var debug = require('debug')('miniproject:dbsetup');


function connect(dbUriString) {
    debug(`connecting to ${dbURI}`);
    const conStr = dbUriString ? dbUriString : dbURI;
    // This returns a promise
    return mongoose.connect(conStr, { useNewUrlParser: true, useCreateIndex: true });
}
mongoose.connection.once('connected', function () {

});
mongoose.connection.once('error', function (err) {
    throw err
});

module.exports = connect;
