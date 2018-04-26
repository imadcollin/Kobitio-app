//Import the mongoose module
var mongoose = require('mongoose');
var teacher = require('./mongo_model');

/***************************** Mongo connector  *****************************/
function db() {
    //Set up default mongoose connection
    var mongoDB = 'mongodb://127.0.0.1/test';
    mongoose.connect(mongoDB);
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    return db = mongoose.connection;
}
/***************************** End of Mongo Connector *****************************/

//Export 
module.exports.db = db;