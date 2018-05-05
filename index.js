'use strict';
let express = require('express');
let app = express();
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//***************************** MLab configuration *****************************/
const APIKey = "9Kc-lKEdig09j-lzqfuaXwDLjKX5a6qO"; //key
const MONGO_URL = "mongodb://mlap:mlap123456@ds255309.mlab.com:55309/uip"; //url
const collections = "https://api.mlab.com/api/1/databases/uip/collections/";

let config = {
	user: `${collections}/user`,
	userInfo: `${collections}/userInfo`,
	deedsHistory: `${collections}/deedsHistory`,
	relations: `${collections}/relations`,
	deeds: `${collections}/deeds`

}
//***************************** Get data  *****************************/
function httpGet(theUrl) {
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", `${theUrl}?apiKey=${APIKey}`, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

/*** Usage example ****/
/*Get all users from the given collection_url*/
let User = httpGet(config.user);
console.log(JSON.parse(User)); //dummy data fetch....


//***************************** Get User details based on name  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/
function getUser(user_name) {
	var url = `${config.user}?q={"username":"${user_name}"}&apiKey=${APIKey}`

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}
/*** Usage example ****/
//let UserName= getUser("adam1990"); 
//console.log(UserName);//dummy data fetch....


//***************************** Mock User data  *****************************/
let mock_user = [{
	"username": "bob12",
	"password": "password",
	"email": "bob@email.com"
}];
//For delete a user... 
let user_id = '5aecf643bd966f1715367d8a';


//***************************** Post data  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/

function httpPost(theUrl, user) {
	let xhr = new XMLHttpRequest();

	xhr.open("POST", `${theUrl}?apiKey=${APIKey}`, true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
	xhr.onload = function () {
		let users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "201") {
			console.log(users);
		} else {
			console.error(users);
		}
	}
	xhr.send(JSON.stringify(user));

}

//***************************** Delete data  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/

function httpDelete(theUrl, user_id) {
	let xhr = new XMLHttpRequest();

	xhr.open("DELETE", `${theUrl}/${user_id}?apiKey=${APIKey}`, true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
	xhr.onload = function () {
		let users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "201") {
			console.log(users);
		} else {
			console.error(users);
		}
	}
	xhr.send(JSON.stringify(mock_user));

}



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


//***************************** Express serve files  *****************************/
app.use(express.static('public'));
app.get('/', function (req, res) {
	res.sendfile('./public/index.html');
});

app.listen(3000); /*PORT 3000 is opened*/