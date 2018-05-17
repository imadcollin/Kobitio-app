'use strict';
let express = require('express');
let app = express();
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var helperDB = require('./public/js/db.js');
var getUserHelper = require('./public/js/db.js');

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

// Fetch the user details for Login //
function getUser(user_name) {
	var url = `${config.user}?q={"username":"${user_name[0]}"}&apiKey=${APIKey}`
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false); // false for synchronous request
	xmlHttp.send(null);
	let user = JSON.parse(xmlHttp.responseText);

	// user is found, 
    if (user)
    {
    	//Check for success 
    	console.log(user);
	    if (user_name[0] == user[0].username && user_name[1] == user[0].password){
	    	return true;
	    }
	    else{
	    	// alert("Wrong Credentials!");
	    	return false;
	    }
    }
    else
    {
    	return false;
    }


}

//Check the accuracy of login information //
function checkLogin(data){

    var success = false;
    let user = getUser(data[0]);
    user = JSON.parse(user);

    // user not found, 
    if (user)
    {
    	return false;
    }
    else
    {
    	return true;
    }
   
    
}

//Post the user details to user Table//
function httpPostUser(user) {

	var theUrl = `${config.user}`;
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

//***************************** Post data  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/
// Add a User to the UserInfo Database


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

app.get('/login', function(req, res) {
	var data = [req.query.user_name,req.query.password];

	if (getUser(data)){
		// Curreent User
		res.cookie('username', data[0], { maxAge: 900000, httpOnly: false }); // Set false to allow, client side code to access cookies 
		// User Partner cookie
		res.cookie('partner', "eve4ever", { maxAge: 900000, httpOnly: false });
		
		//On Success login, re-route to Profile.html
		res.redirect("/profile.html");
	}
	else{
		//on Failed login, re-route to Index.html
		res.redirect("/index.html");
	}

});


//Sign Up 
app.get('/signup', function (req, res, next) {
	
	var data = {
		"username":req.query.user_name,
		"password": req.query.password
	}

	// check if the data is not null
	if (data){
		httpPostUser(data);
	}

res.redirect("/profile.html");


});


//***************************** Express serve files  *****************************/
app.use(express.static('public'));
app.get('/', function (req, res) {
	res.sendfile('./public/index.html');
});


app.listen(3000); /*PORT 3000 is opened*/