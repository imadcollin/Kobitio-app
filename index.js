'use strict';
let express = require('express');
let app = express();
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



//Call post method! 
//httpPost(config.user,mock_user);

//Call delete method! 
//httpDelete(config.user,user_id);


//***************************** Local database connection  *****************************/

/**
 * What this is for?
 * This is the default setting to the local database using mongoose 
 * there are two another files one is the connector and another is model 
 * This two files are require to be able to connect the local mongo db 
 * The example below is showing how to fetch the data from the local db on your machine 
 * Note: 
 * Dont forget to add one field of dummy dta to your local db . 
 */

let models = require('./mongo_model');
let connector = require('./mongo_onnector');

function fetch_local_data() {
	//Set up default mongoose connection
	connector.db().on('error', console.error.bind(console, 'MongoDB connection error:'));
	//Bring the module from mongo_model.
	models.teacher_model().find({}, function (err, users) {
		if (err) throw err;

		// object of all the users
		console.log(users);
	});
}

//fetch_local_data();

app.post('/login', function(req, res) {

	console.log("req " + req);
	console.log("res " + res);

	alert("waitt");
});

//***************************** Express serve files  *****************************/
app.use(express.static('public'));
app.get('/', function (req, res) {
	res.sendfile('./public/index.html');
});


app.listen(3000); /*PORT 3000 is opened*/