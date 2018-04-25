'use strict';
var express = require('express');
var app = express();
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

//***************************** MLab configuration *****************************/
var ApiKey="9Kc-lKEdig09j-lzqfuaXwDLjKX5a6qO";//key
const MONGO_URL ="mongodb://mlap:mlap123456@ds255309.mlab.com:55309/uip";//url
var db_document="https://api.mlab.com/api/1/databases/uip/collections/users?apiKey=9Kc-lKEdig09j-lzqfuaXwDLjKX5a6qO";//document 

//***************************** Get data  *****************************/
function httpGet(theUrl)
{
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", db_document, false ); // false for synchronous request
        xmlHttp.send( null );
    return xmlHttp.responseText;
}
let user_data= httpGet(db_document);
console.log(JSON.parse(user_data));//dummy data fetch....


//***************************** Express serve files  *****************************/
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(3000);/*PORT 3000 is opened*/