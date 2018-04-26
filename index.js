'use strict';
var express = require('express');
var app = express();
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
//***************************** MLab configuration *****************************/
var APIKey="9Kc-lKEdig09j-lzqfuaXwDLjKX5a6qO";//key
const MONGO_URL ="mongodb://mlap:mlap123456@ds255309.mlab.com:55309/uip";//url
var db_collection="https://api.mlab.com/api/1/databases/uip/collections/users"//collection
var db_document=`${db_collection}?apiKey=${APIKey}`;//document 

//***************************** Get data  *****************************/
function httpGet(theUrl)
{
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", db_document, false ); // false for synchronous request
        xmlHttp.send( null );
    return xmlHttp.responseText;
}

//***************************** Mock User data  *****************************/
var mock_user=[{
    "id": 4,
    "name": "test",
    "age": 28,
    "gender": "ss"
}];
//For delete a user... 
var user_id='5ae0f771bd966f59538644bd';

//***************************** Post data  *****************************/
function httpPost(theUrl)
{
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

xhr.open("POST", theUrl, true);
xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
xhr.onload = function () {
	var users = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "201") {
		console.log(users);
	} else {
		console.error(users);
	}
}
xhr.send(JSON.stringify(mock_user));

}

//***************************** Delete data  *****************************/
function httpDelete(theUrl)
{
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

xhr.open("DELETE", `${db_collection}/${user_id}?apiKey=${APIKey}`, true);
xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
xhr.onload = function () {
	var users = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "201") {
		console.log(users);
	} else {
		console.error(users);
	}
}
xhr.send(JSON.stringify(mock_user));

}
var models=require('./mongo_model');
var connector=require('./mongo_onnector');


//export
//Set up default mongoose connection

connector.db().on('error', console.error.bind(console, 'MongoDB connection error:'));

models.teacher_model().find({}, function(err, users) {
	if (err) throw err;
  
	// object of all the users
	console.log(users);
  });

//let user_data= httpGet(db_document);
//console.log(JSON.parse(user_data));//dummy data fetch....

//Call post method! 
//  httpPost(db_document);

//Call delete method! 
//httpDelete(db_document);


//***************************** Express serve files  *****************************/
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(3000);/*PORT 3000 is opened*/