/** Koibito App
 *  profile.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*PROFILE PAGE SCRIPTS
* All scripts related to the profile page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

//On window load, fetching information and inserting it to the html document
document.addEventListener('DOMContentLoaded', function() {
    insertInformation();

}, false);


var users;              //global Variable for users data from the database
var check = false;      //Check wether the data has been fetched once or not 
var numberOfUsers;      // Number of Users

/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

/*Pop up windows*/
$("#ask_points").click(function() {
    $("#overlay").removeClass("hidden");
    $("#requestWindow").removeClass("hidden");
});


$(".close").click(function() {
    $("#overlay").addClass("hidden");
    $("#requestWindow").addClass("hidden");
});

function translate (index) {
    $("#page_title").text(page_title[index]);
}


// Code for Edit profile pop-up window and form
// Get the modal
var modal = document.getElementById('editProfileModal');

// Get the button that opens the modal
var btn = document.getElementById("editProfile");



// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}



// Edit Settings Pop-up Window 

var SettingModal = document.getElementById('editSettingeModal');

// Get the button that opens the modal
var EditSettingButton = document.getElementById("editSetting");

// Get the <span> element that closes the modal

// When the user clicks the button, open the modal 
EditSettingButton.onclick = function() {
    SettingModal.style.display = "block";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == SettingModal) {
        SettingModal.style.display = "none";
    }
}

// Get the <span> element that closes the modal
var close = document.getElementById("close-form");
// When the user clicks on <span> (x), close the modal
close.onclick = function() {

	//getting the id of main modal
	parentDiv = document.getElementById("close-form").parentElement.parentElement.parentElement.parentElement;
    parentDiv.style.display = "none";

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function getAllUsers(){
    check = true;

    var xhr = new XMLHttpRequest();
    //Fetching data from the USer Table
    xhr.open("GET", "https://api.mlab.com/api/1/databases/uip/collections/user?apiKey=9Kc-lKEdig09j-lzqfuaXwDLjKX5a6qO", false);
    xhr.send();

    /* Parsing the response from Api to Json Format*/
    users = JSON.parse(xhr.response);
    /*total number of users*/
    numberOfUsers = users.length;
}


function insertInformation(){
    
    // Getting Partners Name
    var tempUserName = document.cookie.split(",");

    /**************************************** Get User Information ******************************************/
    let deeds = queryDeedsList();

    /**************************************** Get User Information ******************************************/
    let userInformartion = queryUserInformation(tempUserName[0]);  // Login User
    let userPartnerInformation = queryUserInformation('eve4ever');             // partner of the Logined User
    
    //Check Gender 
    var gender = userInformartion[0].gender;
    if (gender == 0){
        gender = 'Hasbandu';
    }
    else if(gender == 1){
        gender = 'Waifu';
    }
    else{
        gender = 'Wakashu';
    }

    //Add User's Name
    document.getElementById('name').innerHTML = userInformartion[0].first_name + " " + userInformartion[0].last_name +" ("+ gender +")"; 
    //User Description
    document.getElementById("userDescription").innerHTML  = userInformartion[0].description;
    //Partner Name
    document.getElementById("partnerName").innerHTML  = '<b>Current Hasbandu:</b> '+ userPartnerInformation[0].first_name + " " + userPartnerInformation[0].last_name;

    /********************************** Get User RelationShip History ************************************/
    let userRelationship = queryUserRelationship(tempUserName[0]);   

    /********************************** Get User Deeds History ************************************/
    let userDeedsHistory =  queryUserDeedsHistory(tempUserName[0]);
    var deedsHistortyLength = userDeedsHistory.length;

    var id;

    for (var i = 0; i < deedsHistortyLength; i++) {
        
        //Deed Id 
        id = userDeedsHistory[i].deed_id;
        console.log(deeds[id].description);

        // document.getElementById('overviewList').innerHTML = '<div class="deed wakashu">'+
        //         '<img src="img/deeds/D00001.png">'+
        //         '<h3 class="title">'+deeds[id].description+'</h3>'+
        //         '<h4 class="points"><b>'+deeds[id].points+' points</b></h4></div>'

        document.getElementById('overviewList').innerHTML = '<li class="list-group-item" >'+
                    '<div ><img src="https://png.icons8.com/color/96/000000/vegan-food.png" ></div>'+
                    '<div><h3 class="title">'+deeds[id].description+'</h3>'+
                    '<h6 class="date">Endorsed by Eve <i class="fa fa-heart red"></i> on 12/12/1999</h6></div>'+
                     '<div><h4 class="points"><b>'+deeds[id].points+ 'points</b></h4></div></li>'
    }

}








































