/** Koibito App
 *  history.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*INDEX PAGE SCRIPTS
* All scripts related to the index page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

var users;              //global Variable for users data from the database
var check = false;      //Check wether the data has been fetched once or not 
var numberOfUsers;      // Number of Users


/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

/*Pop up windows*/
$("#login_button").click(function() {
    $("#overlay").removeClass("hidden");
    $("#loginWindow").removeClass("hidden");
});

$("#signup_button").click(function() {
    $("#overlay").removeClass("hidden");
    $("#signupWindow").removeClass("hidden");
});

$("#give_points").click(function() {
    $("#overlay").removeClass("hidden");
    $("#giveWindow").removeClass("hidden");
});

$(".close").click(function() {
    $("#overlay").addClass("hidden");
    $("#loginWindow").addClass("hidden");
    $("#signupWindow").addClass("hidden");
});

function translate (index) {
    $("#page_title").text(page_title[index]);
    $("#mission").text(mission[index]);
    $("#login_button").text(login_button[index]);
    $("#signup_button").text(signup_button[index]);

}

function getAllUsers(){
    check = true;

    /* Making a API call */
var xhr = new XMLHttpRequest();
    //Fetching data from the USer Table
    xhr.open("GET", "https://api.mlab.com/api/1/databases/uip/collections/user?apiKey=9Kc-lKEdig09j-lzqfuaXwDLjKX5a6qO", false);
    xhr.send();

    /* Parsing the response from Api to Json Format*/
    users = JSON.parse(xhr.response);
    /*total number of users*/
    numberOfUsers = users.length;
}

/*Login Form Submission*/
function checkLogin(){
    
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("Password").value;
    var success = false;

    if (!check){
        getAllUsers();
    }

    //check if the credentials match or not 
    for (var i = 0; i < numberOfUsers; i++) {
        if (userName == users[i].username){
            if (password == users[i].password){
                success =  true;
                break;
            }
        }
    }

    if (!success){
        alert("Wrong credentials!");
    }
    else{
        window.location.href = "http://stackoverflow.com";
    }
    
}




























