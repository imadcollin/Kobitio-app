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
//let User = httpGet(config.user);
//console.log(JSON.parse(User)); //dummy data fetch....


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
//let UserName= getUser(document.cookie); 
//console.log(UserName);//dummy data fetch....



//***************************** Get User Information based on UserNamename  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/
function queryUserInformation(user_name) {
	var url = `${config.userInfo}?q={"username":"${user_name}"}&apiKey=${APIKey}`

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

//***************************** Get User RelationShip based on UserNamename  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/
function queryUserRelationship(user_name) {
	var url = `${config.relations}?q={"username":"${user_name}"}&apiKey=${APIKey}`

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}


//***************************** Get User Deeds History based on UserNamename  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/
function queryUserDeedsHistory(user_name) {
	var url = `${config.deedsHistory}?q={"username":"${user_name}"}&apiKey=${APIKey}`

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

//***************************** Get List of Deeds *****************************/
function queryDeedsList() {
	var url = `${config.deeds}?apiKey=${APIKey}`

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

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
function httpPost(user) {

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


//***************************** Example data  *****************************/
// ToDo: Remove and replace with what you want ..... 
function test_1(){
	alert("user name loggedin " + UserNameSession );
}

function test_2(){
 //    let User = httpGet(config.user);
 //    console.log(JSON.parse(User)); //dummy data fetch....
	// alert(User);

	let adam = getUser(document.cookie);
	console.log(JSON.parse(adam)); //dummy data fetch....
}

/*Check for user Login credential from the databse*/
function checkLogin(){
    
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("Password").value;
    var success = false;

    let user = getUser(userName);
    user = JSON.parse(user);

    //Check for success 
    if (userName == user[0].username && password == user[0].password){
    	document.cookie=user[0].username;
    	//BUGGG//
    	return res.redirect('/profile.html'); 
    	alert("wait");
    	// window.location.replace("http://stackoverflow.com");
    }
    else{
    	alert("Wrong Credentials!");
    }
}

/*Fetch and return the user Information --> UserInformation Table*/
function getUserInformation(){
	let userInfo = queryUserInformation(document.cookie);
    userInfo = JSON.parse(userInfo);
    return userInfo;
}


/*Fetch and return the user Relationship --> UserRelationship Table*/
function getUserRelationship(){
	let userRelation = queryUserRelationship(document.cookie);
    userRelation = JSON.parse(userRelation);
    return userRelation;
}

/*Fetch and return the user Deeds --> UserDeeds Table*/
function getUserDeedsHistory(){
	let userDeedsHistory = queryUserDeedsHistory(document.cookie);
    userDeedsHistory = JSON.parse(userDeedsHistory);
    return userDeedsHistory;
}

/*Fetch and return the List of Deeds  --> Deeds Table*/
function getDeedsList(){
	let deedsList = queryDeedsList();
    deedsList = JSON.parse(deedsList);
    return deedsList;
}












