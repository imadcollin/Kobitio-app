/** Koibito App
 *  partner.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*PARTNER PAGE SCRIPTS
* All scripts related to the partner page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

/*LOAD CURRENT SECTION DATA FROM SESSION STORAGE*/
if (sessionStorage.getItem("SESSION_HISTORY_TABLE") == null){
    sessionStorage.setItem("SESSION_HISTORY_TABLE",JSON.stringify(HISTORY_TABLE));
    //alert("History databases loaded from script!")
} /*else {
    alert("History database will be loaded from session storage!")
}*/

var SESSION_HISTORY_TABLE = JSON.parse(sessionStorage.getItem("SESSION_HISTORY_TABLE"));
//alert(JSON.stringify(SESSION_HISTORY_TABLE));

/*Retrieve login information from localStorage*/
var so_information = localStorage.getItem("so_information");
var user_information = localStorage.getItem("user_information");

var endorsed_deeds = []; // keep track of the endorsed deeds
var partners_deed_history = []; // retrieve all partner's deeds from HISTORY_TABLE
var points = 0; // calculate points

if (so_information == null){
    window.location.href = "profile.html";
} else {
    so_information = JSON.parse(so_information); // parse string back to JSON
    user_information = JSON.parse(user_information);

    //alert("You are looking at your partners profile " + so_information.first_name);

    /*Load User and SO information into page*/
    $(".user_firstname").text(user_information.first_name);
    $(".user_gender").text(getGender(user_information.gender));

    /*Load SO information into page*/
    $("#profile_picture").attr("src","img/users/"+ so_information.username +".jpg");
    $(".firstname").text(so_information.first_name);
    $(".lastname").text(so_information.last_name);
    $("#description").text(so_information.description);

    /*Gender will be used for different CSS styling*/
    var so_gender = getGender(so_information.gender);
    $(".so_gender").text(so_gender);
    $(".so_css").addClass(so_gender);

    /*Retrieve SO deeds from HISTORY_TABLE*/
    $.each(SESSION_HISTORY_TABLE, function(element){ // fill in deeds table
        if (this.username == so_information.username && (this.date != null && this.date != -1)){ // find more elegant solution
            partners_deed_history.push(this)
        }
    });

    /*Calculate points*/
    $.each(partners_deed_history, function(element){ // calculate points
        points += deed_points(this.deed);
    });

    //alert("Total points " + points);
    $(".total_points").text(points);
    $("#stars").html(individual_stars(points));
    $("#score").text(score(points));

    /*Load Partner overview into page*/
    $.each(partners_deed_history.slice(-6), function(element){ // fill in deeds table
        $("#deeds_overview").prepend(
            "<div class='deed " + so_gender +"'>" +
            "<img src='img/deeds/"+ this.deed +".png'>" +
            "<h3 class='title'>" + so_information.first_name + " " + deed_description(this.deed) + "</h3>" +
            "<h6 class='date'>Endorsed by " + user_firstname(this.endorsed_by) + " <i class='fa fa-heart red'></i> on "+ formatDate(this.date) +"</h6>" +
            "<h4 class='points'><b>+"+ deed_points(this.deed)+" points</b></h4>" +
            "</div>"
        )
    });
}

/*Deed Selection functions*/

$(document).on('click','.deed',function(){
    //alert("You have clicked on a deed no. " + this.id);
    if (!($("#" + this.id).hasClass("selected"))){
        $("#" + this.id).addClass("selected");
    } else {
        //alert ("Item " + this.id + " has been selected " + checkRepeated(this.id, give_points) + " times!");
        $("#" + this.id).find(".multiplier").text("(x"+ checkRepeated(this.id, endorsed_deeds) +")");
    }

    endorsed_deeds.push(this.id);
    //alert(endorsed_deeds.toString());
    $("#total_points").text(updatePoints(endorsed_deeds));

});

function resetGivePointsWindow () { // resets give points window
    endorsed_deeds = [];

    $("#deeds_list").empty();

    /*Load Deeds list into page*/
    $.each(DEEDS_TABLE, function(element){ // fill in deeds table
        //alert(JSON.stringify(this))
        $("#deeds_list").append(
            "<div class='deed wakashu clickable' id='"+ this.deed +"'>" +
            "<img src='img/deeds/"+this.deed+".png'>" +
            "<h3 class='title'>" + so_information.first_name + " " + this.description + "</h3>" +
            "<h4 class='points'><b>"+ this.points +" points <span class='multiplier'></span></b></h4>" +
            "</div>"
        )
    });

    $("#total_points").text(0);

}

$("#submitPoints").click(function(){

    if (endorsed_deeds.length == 0){
        alert("You must select at least one deed before you can submit your endorsment")
    } else {
        //alert(endorsed_deeds.toString());
        endorsed_deeds.forEach(function(item) {
            var new_record = {
                "username": so_information.username,
                "endorsed_by": user_information.username,
                "deed": item,
                "date": new Date()
            };
            //alert(JSON.stringify(new_record));
            SESSION_HISTORY_TABLE.push(new_record)
        });

        sessionStorage.setItem("SESSION_HISTORY_TABLE", JSON.stringify(SESSION_HISTORY_TABLE));

        alert("SUCCESS! You have endorsed " + so_information.first_name + " with " + updatePoints(endorsed_deeds) + " " + so_gender + " points!");
        window.location.href = "partner.html";
    }

});

$("#resetPoints").click(function(){
    resetGivePointsWindow();
});

/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

/*Pop up windows*/
$("#give_points").click(function() {
    $("#overlay").removeClass("hidden");
    $("#giveWindow").removeClass("hidden");
    resetGivePointsWindow();
});

$(".close").click(function() {
    $("#overlay").addClass("hidden");
    $("#giveWindow").addClass("hidden")
});

function translate (index) {
    $("#page_title").text(page_title[index]);
}