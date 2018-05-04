'use strict';
var express = require('express');
var app = express();
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

//***************************** MLab configuration *****************************/
var APIKey="9Kc-lKEdig09j-lzqfuaXwDLjKX5a6qO";//key
const MONGO_URL ="mongodb://mlap:mlap123456@ds255309.mlab.com:55309/uip";//url
var user_collection="https://api.mlab.com/api/1/databases/uip/collections/users"//collection
var collection_url=`${user_collection}?apiKey=${APIKey}`;//document 


//***************************** Get data  *****************************/
function httpGet(theUrl)
{
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
    return xmlHttp.responseText;
}

//***************************** Get User details based on name  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/
function getUser(user_name){
	var url=`https://api.mlab.com/api/1/databases/uip/collections/users?q={"name":"${user_name}"}&apiKey=9Kc-lKEdig09j-lzqfuaXwDLjKX5a6qO`
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.send( null );
    return xmlHttp.responseText;


}

//***************************** Mock User data  *****************************/
var mock_user=[{
    "id": 4,
    "name": "posted",
    "age": 28,
    "gender": "ss"
}];
//For delete a user... 
var user_id='5aecadfaf707015922a75a59';


//***************************** Post data  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/

function httpPost(theUrl,user)
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
xhr.send(JSON.stringify(user));

}

//***************************** Delete data  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/

function httpDelete(theUrl,user_id)
{
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

xhr.open("DELETE", `${theUrl}/${user_id}?apiKey=${APIKey}`, true);
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
/*Get all users from the given collection_url*/
let user_data= httpGet(collection_url); 
console.log(JSON.parse(user_data));//dummy data fetch....
/*Query user using name....   */
//let user_data= getUser("bob"); 
//console.log(user_data);//dummy data fetch....

//Call post method! 
//httpPost(collection_url,mock_user);

//Call delete method! 
httpDelete(user_collection,user_id);


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

var models=require('./mongo_model');
var connector=require('./mongo_onnector');

function fetch_local_data(){
//Set up default mongoose connection
connector.db().on('error', console.error.bind(console, 'MongoDB connection error:'));
//Bring the module from mongo_model.
models.teacher_model().find({}, function(err, users) {
	if (err) throw err;
  
	// object of all the users
	console.log(users);
  });
}

//fetch_local_data();


//***************************** Express serve files  *****************************/
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(3000);/*PORT 3000 is opened*/


