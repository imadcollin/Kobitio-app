/** Koibito App
 *  anon_user.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/* SINGLE PAGE SCRIPTS
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
var user_information = localStorage.getItem("user_information");
var anon_user = "tobias_hasbandu";//localStorage.getItem("anon_information");


var anon_deed_history = []; // retrieve all partner's deeds from HISTORY_TABLE
var points = 0; // calculate points

if (anon_user == null){
    window.location.href = "profile.html";
} else {
    anon_user = JSON.parse(anon_user); // parse string back to JSON
    user_information = JSON.parse(user_information);

    //alert("You are looking at your partners profile " + anon_user.first_name);

    /*Load User and SO information into page*/
    $(".user_firstname").text(user_information.first_name);
    $(".user_gender").text(getGender(user_information.gender));

    /*Load SO information into page*/
    $("#profile_picture").attr("src","img/users/"+ anon_user.username +".jpg");
    $(".firstname").text(anon_user.first_name);
    $(".lastname").text(anon_user.last_name);
    $("#description").text(anon_user.description);

    /*Gender will be used for different CSS styling*/
    var so_gender = getGender(anon_user.gender);
    $(".so_gender").text(so_gender);
    $(".so_css").addClass(so_gender);

    /*Retrieve SO deeds from HISTORY_TABLE*/
    $.each(SESSION_HISTORY_TABLE, function(element){ // fill in deeds table
        if (this.username == anon_user.username && (this.date != null && this.date != -1)){ // find more elegant solution
            anon_deed_history.push(this)
        }
    });

    /*Calculate points*/
    $.each(anon_deed_history, function(element){ // calculate points
        points += deed_points(this.deed);
    });

    //alert("Total points " + points);
    $(".total_points").text(points);
    $("#stars").html(individual_stars(points));
    $("#score").text(score(points));

    /*Load Partner overview into page*/
    $.each(anon_deed_history.slice(-6), function(element){ // fill in deeds table
        $("#deeds_overview").prepend(
            "<div class='deed " + so_gender +"'>" +
            "<img src='img/deeds/"+ this.deed +".png'>" +
            "<h3 class='title'>" + anon_user.first_name + " " + deed_description(this.deed) + "</h3>" +
            "<h6 class='date'>Endorsed by " + user_firstname(this.endorsed_by) + " <i class='fa fa-heart red'></i> on "+ formatDate(this.date) +"</h6>" +
            "<h4 class='points'><b>+"+ deed_points(this.deed)+" points</b></h4>" +
            "</div>"
        )
    });
}




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

if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

function translate (index) {
    $("#page_title").text(page_title[index]);
}
