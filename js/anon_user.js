/** Koibito App
 *  anon_user.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/* ANON_USER PAGE SCRIPTS
* All scripts related to the single page. Each page has their own scripts in a single js document.
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
var anon_information = localStorage.getItem("anon_information");
var user_information = localStorage.getItem("user_information");

var anon_deed_history = []; // retrieve all partner's deeds from HISTORY_TABLE
var anon_points = 0; // calculate anon_points

if (anon_information == null){
    window.location.href = "profile.html";
} else {
    anon_information = JSON.parse(anon_information); // parse string back to JSON
    user_information = JSON.parse(user_information);

    if (activeRelationship(anon_information.username, user_information.username)){
        window.location.href = "partner.html";
    }
    if( user_information.username == anon_information.username){
        window.location.href = "profile.html";
    }

    //alert("You are looking at anonymous " + anon_information.username);

    /*Load anon information into page*/
    $("#profile_picture").attr("src","img/users/"+ anon_information.username +".jpg");
    $(".firstname").text(anon_information.first_name);
    $(".lastname").text(anon_information.last_name);
    $("#description").text(anon_information.description);

    /*Gender will be used for different CSS styling*/
    var gender = getGender(anon_information.gender);
    $(".gender").text(gender);
    $(".anon_css").addClass(gender);

   if (hasSO(anon_information.username)){

       var so_username = getSO(anon_information.username);

       $.each(INFORMATION_TABLE, function(element){ // return SO data from information table
           if (this.username == so_username){
               so_information = this;
               return false;
           }
       });

        $("#relationship_info").html("<b>Current "+ getGender(so_information.gender) +": </b>" + so_information.first_name + " <i class='fa fa-heart red'></i>");
        localStorage.setItem("anon_information", JSON.stringify(so_information));
        $("#relationship_info").attr("href", "anon_user.html");
    } else {
        $("#relationship_info").html("<b><i>Looking for a new koibito! </i></b><i class='fa fa-heart-o red'></i>");
        $("#relationship_info").attr("href", "");
    }

    /*Retrieve anon deeds from HISTORY_TABLE*/
    $.each(SESSION_HISTORY_TABLE, function(element){ // fill in deeds table
        if (this.username == anon_information.username && (this.date != null && this.date != -1)){ // find more elegant solution
            anon_deed_history.push(this)
        }
    });

    /*Calculate anon points*/
    $.each(anon_deed_history, function(element){ // calculate anon_points
        anon_points += deed_points(this.deed);
    });

    $(".total_points").text(anon_points);
    $("#stars").html(individual_stars(anon_points));
    $("#score").text(score(anon_points));

    /*Load anonymous overview into page*/
    $.each(anon_deed_history.slice(-6), function(element){ // fill in deeds table
        $("#deeds_overview").prepend(
        "<div class='deed " + gender +"'>" +
        "<img src='img/deeds/"+ this.deed +".png'>" +
        "<h3 class='title'>" + anon_information.first_name + " " + deed_description(this.deed) + "</h3>" +
        "<h6 class='date'>Endorsed by " + getFirstname(this.endorsed_by) + " <i class='fa fa-heart red'></i> on "+ formatDate(this.date) +"</h6>" +
        "<h4 class='points'><b>" + deed_points(this.deed)+" points</b></h4>" +
        "</div>"
    )
    });
}

$

/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

function translate (index) {
    $("#page_title").text(page_title[index]);
}