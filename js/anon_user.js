/** Koibito App
 *  anon_user.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/* ANON_USER PAGE SCRIPTSgt
* All scripts related to the single page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

loadSessionDB();
var SESSION_HISTORY_TABLE = JSON.parse(sessionStorage.getItem("SESSION_HISTORY_TABLE"));

/*Retrieve login information from localStorage*/
var login_data = JSON.parse(localStorage.getItem("login_data"));
var anon_username = localStorage.getItem("anon_username");

if (anon_username == null){
    window.location.href = "profile.html";
} else {

    var anon_information = getUserInfo(anon_username);
    var user_information = getUserInfo(login_data.username);

    if (activeRelationship(anon_information.username, user_information.username)){
        window.location.href = "partner.html"; // if anon == partner redirect to corresponding view
    }
    if( user_information.username == anon_information.username){
        window.location.href = "profile.html"; // if anon == user redirect to corresponding view
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

       var so_information = getUserInfo(getSO(anon_username));

        $("#relationship_info").html("<b>Current "+ getGender(so_information.gender) +": </b>" + so_information.first_name + " <i class='fa fa-heart red'></i>");
        localStorage.setItem("anon_information", JSON.stringify(so_information));
        $("#relationship_info").attr("href", "anon_user.html");
    } else {
        $("#relationship_info").html("<b><i>Looking for a new koibito! </i></b><i class='fa fa-heart-o red'></i>");
        $("#relationship_info").attr("href", "");
    }

    /*Retrieve anon deeds from HISTORY_TABLE*/
    var anon_deed_history = getUserDeeds(anon_username);

    /*Calculate anon points*/
    var anon_points = calculatePoints(anon_deed_history);

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

/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

function translate (index) {
    $("#page_title").text(page_title[index]);
}