
/** Koibito App
*  Profile.js
* Created by Group 8, Uppsala University  April 2018. -->
*/

/*PROFILE PAGE SCRIPTS
* All scripts related to the profile page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

// Get the deeds list 
let deeds;
//Save total points
var totalPoints = 0;
var pointsIdArray = [];
var redo = [];


//On window load, fetching information and inserting it to the html document
document.addEventListener('DOMContentLoaded', function() {
    
    /**************************************** Get Deels List ******************************************/
    deeds = queryDeedsList();

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
    resetWindow();
    $("#overlay").removeClass("hidden");
    $("#requestWindow").removeClass("hidden");
});

$("#deed_1").click(function() {
    $("#deed_1").addClass("selected");
    totalPoints += 150;

    $("#totalPoints").html(totalPoints);
    pointsIdArray.push("deed_1");
    redo = [];
    $("#undo").removeClass("greyed_out");
    $("#resetPoints").removeClass("greyed_out");
    $("#submitRequest").removeClass("greyed_out");

});

$("#deed_2").click(function() {
    $("#deed_2").addClass("selected");
    totalPoints += 100;

    $("#totalPoints").html(totalPoints);
    pointsIdArray.push("deed_2");
    redo = [];
    $("#undo").removeClass("greyed_out");
    $("#resetPoints").removeClass("greyed_out");
    $("#submitRequest").removeClass("greyed_out");

});

$("#deed_3").click(function() {
    $("#deed_3").addClass("selected");
    totalPoints += 50;

    $("#totalPoints").html(totalPoints);
    pointsIdArray.push("deed_3");
    redo = [];
    $("#undo").removeClass("greyed_out");
    $("#resetPoints").removeClass("greyed_out");
    $("#submitRequest").removeClass("greyed_out");
});

$("#deed_4").click(function() {
    $("#deed_4").addClass("selected");
    totalPoints += 100;

    $("#totalPoints").html(totalPoints);
    pointsIdArray.push("deed_4");
    redo = [];
    $("#undo").removeClass("greyed_out");
    $("#resetPoints").removeClass("greyed_out");
    $("#submitRequest").removeClass("greyed_out");

});

$("#deed_5").click(function() {

    $("#deed_5").addClass("selected");
    totalPoints += 1000;
    pointsIdArray.push("deed_5");

    $("#totalPoints").html(totalPoints);
    redo = [];
    $("#undo").removeClass("greyed_out");
    $("#resetPoints").removeClass("greyed_out");
    $("#submitRequest").removeClass("greyed_out");

});

$("#undo").click(function() {
    var undoThis = pointsIdArray.pop();

    if (undoThis == "deed_1"){
        $("#deed_1").removeClass("selected");
        totalPoints -= 150;
        redo.push("deed_1");
    }

    if (undoThis == "deed_2"){
        $("#deed_2").removeClass("selected");
        totalPoints -= 100;
        redo.push("deed_2");
    }

    if (undoThis == "deed_3"){
        $("#deed_3").removeClass("selected");
        totalPoints -= 50;
        redo.push("deed_3");
    }

    if (undoThis == "deed_4"){
        $("#deed_4").removeClass("selected");
        totalPoints -= 100;
        redo.push("deed_4");
    }

    if (undoThis == "deed_5"){
        $("#deed_5").removeClass("selected");
        totalPoints -= 1000;
        redo.push("deed_5");
    }

    $("#redo").removeClass("greyed_out");

    if (pointsIdArray.length < 1){
        $("#undo").addClass("greyed_out");
        $("#resetPoints").addClass("greyed_out");
        $("#submitRequest").addClass("greyed_out");
    }

    $("#totalPoints").html(totalPoints);
});


$("#redo").click(function() {

    //alert(redo.toString());
    var redoThis = redo.pop();

    if (redoThis == "deed_1"){
        $("#deed_1").addClass("selected");
        totalPoints += 150;
        pointsIdArray.push("deed_1");
    }

    if (redoThis == "deed_2"){
        $("#deed_2").addClass("selected");
        totalPoints += 100;
        pointsIdArray.push("deed_2");
    }

    if (redoThis == "deed_3"){
        $("#deed_3").addClass("selected");
        totalPoints += 50;
        pointsIdArray.push("deed_3");
    }

    if (redoThis == "deed_4"){
        $("#deed_4").addClass("selected");
        totalPoints += 100;
        pointsIdArray.push("deed_4");
    }

    if (redoThis == "deed_5"){
        $("#deed_5").addClass("selected");
        totalPoints += 1000;
        pointsIdArray.push("deed_5");
    }

    if (redo.length < 1){
        $("#redo").addClass("greyed_out");
    }

    $("#resetPoints").removeClass("greyed_out");
    $("#submitRequest").removeClass("greyed_out");
    $("#undo").removeClass("greyed_out");
    $("#totalPoints").html(totalPoints);
});

$("#resetPoints").click(function() {
    resetWindow ();
});

function resetWindow (){
    $("#deed_1").removeClass("selected");
    $("#deed_2").removeClass("selected");
    $("#deed_3").removeClass("selected");
    $("#deed_4").removeClass("selected");
    $("#deed_5").removeClass("selected");

    $("#undo").addClass("greyed_out");
    $("#redo").addClass("greyed_out");
    $("#resetPoints").addClass("greyed_out");
    $("#submitRequest").addClass("greyed_out");
    $("#resetPoints").addClass("greyed_out");

    totalPoints = 0;

    $("#totalPoints").html(totalPoints);

    pointsIdArray = [];
    redo = [];
}

$("#submitRequest").click(function() {
    alert("You have submitted a request for " + totalPoints + " hasbandu points!")
    $("#requestWindow").addClass("hidden");
    $("#overlay").addClass("hidden");
});


$(".close").click(function() {
    $("#overlay").addClass("hidden");
    $("#requestWindow").addClass("hidden");
});

function translate (index) {
    $("#page_title").text(page_title[index]);
    $("#MyProfile").text(MyProfile[index]);
    $("#CurrentRelation").text(CurrentRelation[index]);
    $("#RelationHistory").text(RelationHistory[index]);
    $("#About").text(About[index]);
    $("#Explore").text(Explore[index]);

    $("#logOff").text(logOff[index]);
    $("#EditProfile").text(EditProfile[index]);
    $("#Settings").text(Settings[index]);
    $("#ReqPoints").text(ReqPoints[index]);
    $("#ReviewPoints").text(ReviewPoints[index]);
    $("#DeedsHistory").text(DeedsHistory[index]);


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
    // var tempUserName = document.cookie.split(",");

    /**************************************** Get User Information ******************************************/
    let userInformartion = queryUserInformation(readCookie("username"));  // Login User
    let userPartnerInformation = queryUserInformation(readCookie("partner"));             // partner of the Logined User
    
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
    let userRelationship = queryUserRelationship(readCookie("username"));   

    /********************************** Get User Deeds History ************************************/
    let userDeedsHistory =  queryUserDeedsHistory(readCookie("username"));
    var deedsHistortyLength = userDeedsHistory.length;

    var id; 

    // Find a <table> element with id="myTable":
    var table = document.getElementById("contentTable");
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row;
    var date;

    for (var i = 0; i < deedsHistortyLength; i++) {
        
        //id of the deed
        id = userDeedsHistory[i].deed_id;

        // Create an empty <tr> element and add it to the 1st position of the table:
        row = table.insertRow(i);

        //Desertlizing json date to normal date 
        date = new Date(userDeedsHistory[i].date['$date']);
        date = date.toDateString();

        // Add some text to the new cells:
        row.innerHTML = '<td> <div class="media">'+
                                                '<a href="#" class="pull-left">'+
                                                    '<img src="img/deeds/D00002.png" class="media-photo">'+
                                                '</a>'+
                                                '<div class="media-body">'+
                                                    '<span class="media-meta pull-right"> '+date+'</span>'+
                                                    '<h4 class="title">'+deeds[id].description+
                                                        '<span class="pull-right pendiente">(Pendiente)</span>'+
                                                    '</h4>'+
                                                    '<p class="summary">Endorsed by '+ userDeedsHistory[i].username +'</p>'+
                                                    '<p class="pull-right">'+deeds[id].points+' points</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</td>'
    }

}


/******************************Request Pont Window Functions *****************************/

// Gets the id of the <Div> and adds the points to the DataBase
function addRequestPoints(element){
    
    var pointsId;

    var pointsId = element.id;
    var sizeDeeds = deeds.length;

    //Find the deeds points from the table
    //The query reply order is not in synchrony with the deedsList Id, so using loop
    for(var i = 0;i<sizeDeeds; i++){
        if(deeds[i].deed_id == pointsId){
            totalPoints = totalPoints + parseInt(deeds[i].points);
            pointsIdArray.push(pointsId);
        } 
    }

    //Update the Total Selected Points
    document.getElementById('requestedPoints').innerHTML = totalPoints;

}

//Get the total points and add it to the database 
function addPointsToDatabase(){

    //number of points requested
    var size = pointsIdArray.length;
    var data;

    for (var i = 0; i < size; i++) {
        data = {
            "username": readCookie("username"),
            "endorsed_by": readCookie("partner"),
            "deed": pointsIdArray[i],
            "date": null
        }   

        // //Make a post Request;
        httpPointsPost(data);
    }
}



































