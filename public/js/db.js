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

/* Read Cookie */
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


/* Array for storing  details
0 - User's Username 
1 - User's partnet Name
*/

var UserDetailsArray = ['',''];

//Use this to delete the cookie to delete 
/*Check for user Login credential from the databse*/
function checkLogin(){
    
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("Password").value;
    var success = false;

    let user = getUser(userName);
    user = JSON.parse(user);
    
    UserDetailsArray[0] = user[0].username;
	setCookie(document.cookie, 0);
    setCookie(UserDetailsArray, 100);

    //Check for success 
    if (userName == user[0].username && password == user[0].password){
    	 //BUGGG//
    	// window.location.replace("http://stackoverflow.com");
    }
    else{
    	alert("Wrong Credentials!");
    }
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
	return JSON.parse(xmlHttp.responseText);

}

//***************************** Get User RelationShip based on UserNamename  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/
function queryUserRelationship(user_name) {
	var url = `${config.relations}?q={"username":"${user_name}"}&apiKey=${APIKey}`

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false); // false for synchronous request
	xmlHttp.send(null);
	
	let userRelation = JSON.parse(xmlHttp.responseText);

	/*Check for relationShip Status*/
    if (userRelation.B){ //relationshiop exists
    	var tempUserName = document.cookie.split(",");
    	UserDetailsArray[0] = tempUserName[0];
    	UserDetailsArray[1] = userRelation.B;

    	setCookie(document.cookie, 0);
    	setCookie(UserDetailsArray, 60);
    }
    else{// delete theis statetement
    	var tempUserName = document.cookie.split(",");
    	UserDetailsArray[0] = tempUserName[0];
    	UserDetailsArray[1] = 'eve4ever';

    	setCookie(document.cookie, 0);
    	setCookie(UserDetailsArray, 60);
    }

    return userRelation;
}

//***************************** Get User Deeds History based on UserNamename  *****************************/
//link to full documentation: http://docs.mlab.com/data-api/
function queryUserDeedsHistory(user_name) {
	var url = `${config.deedsHistory}?q={"username":"${user_name}"}&apiKey=${APIKey}`
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false); // false for synchronous request
	xmlHttp.send(null);
	return JSON.parse(xmlHttp.responseText);
}

//***************************** Get List of Deeds *****************************/
function queryDeedsList() {
	var url = `${config.deeds}?apiKey=${APIKey}`
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false); // false for synchronous request
	xmlHttp.send(null);
	return JSON.parse(xmlHttp.responseText);
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
// Add a User to the UserInfo Database
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
	// console.log(JSON.parse(adam)); //dummy data fetch....
}

/*set Cookies*/
function setCookie(cvalue, exMins) {
    var d = new Date();
    d.setTime(d.getTime() + (exMins*60*1000));
    var expires = "expires="+d.toUTCString();  
    document.cookie =  cvalue + ";" + expires + ";path=/";
    return true;
}


function Logout(){
	UserDetailsArray = [];
	setCookie(document.cookie, 0);
}







/*Fetch and return the user Information --> UserInformation Table*/
// function getUserInformation(){
// 	var tempUserName = document.cookie.split(",");
// 	let userInfo = queryUserInformation(tempUserName[0]);
//     userInfo = JSON.parse(userInfo);
//     return userInfo;
// };

/*Fetch and return the user Relationship --> UserRelationship Table*/
// function getUserRelationship(){
// 	var tempUserName = document.cookie.split(",");
// 	let userRelation = queryUserRelationship(tempUserName[0]);
//     userRelation = JSON.parse(userRelation);

//     /*Check for relationShip Status*/
//     if (userRelation.B){ //relationshiop exists
//     	setCookie(document.cookie, 0);	//Delete cookie data
//     	UserDetailsArray[1] = userRelation.B;
//     	setCookie(UserDetailsArray, 60);
//     	console.log("yes")
//     }
//     else{// delete theis statetement
//     	console.log("no");
//     	setCookie(document.cookie, 0);	
//     	UserDetailsArray[1] = 'eve4ever';
//     	setCookie(UserDetailsArray, 60);
//     }

//     return userRelation;
// }

/*Fetch and return the user Deeds --> UserDeeds Table*/
// function getUserDeedsHistory(){
// 	var tempUserName = document.cookie.split(",");
// 	let userDeedsHistory = queryUserDeedsHistory(tempUserName[0]);
//     userDeedsHistory = JSON.parse(userDeedsHistory);
//     return userDeedsHistory;
// }

/*Fetch and return the List of Deeds  --> Deeds Table*/
// function getDeedsList(){
// 	let deedsList = queryDeedsList();
//     deedsList = JSON.parse(deedsList);
//     return deedsList;
// }


/**************************** Functions to fetch Information of the partner ********************************/

// Get user Partner Information
// function getUserPartnersInformation(){
// 	var tempUserName = document.cookie.split(",");
// 	//Uncomment
// 	// let userInfo = queryUserInformation(tempUserName[1]);
// 	let userInfo = queryUserInformation('eve4ever');
//     userInfo = JSON.parse(userInfo);
//     return userInfo;
// };









