var mongoose = require('mongoose');
const dbURI = require("./settings").DEV_DB_URI;



function connect(dbUriString){
    console.log(`connecting to ${dbURI}...`);
    const conStr = dbUriString ? dbUriString : dbURI;
    // This returns a promise
    return mongoose.connect(conStr,{ useNewUrlParser: true, useCreateIndex: true }); 
}
mongoose.connection.once('connected', function () { 
    
});
mongoose.connection.once('error',function (err) { 
    
});

module.exports = connect;
