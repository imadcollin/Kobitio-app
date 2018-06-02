/** Koibito App
 *  profile.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*PROFILE PAGE SCRIPTS
* All scripts related to the profile page. Each page has their own scripts in a single js document.
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
var login_data = localStorage.getItem("login_data");

var requested_deeds = []; // keep track of the endorsed deeds
var selected_deeds = []; // keep track of the pending deeds selected
var users_deed_history = []; // retrieve all user's deeds from HISTORY_TABLE
var user_points = 0; // calculate points

if (login_data == null){
    window.location.href = "index.html";
} else {
    login_data = JSON.parse(login_data); // parse string back to JSON
    //alert("Log in as " + login_data.username);

    user_information = getUserInfo(login_data.username);
    localStorage.setItem("user_information", JSON.stringify(user_information));

    /*$.each(INFORMATION_TABLE, function(element){ // return user data from information table
        if (this.username == login_data.username){
            user_information = this;
            localStorage.setItem("user_information", JSON.stringify(user_information));
            return false;
        }
    });*/

    /*Retrieve all users deeds from HISTORY_TABLE*/
    $.each(SESSION_HISTORY_TABLE, function(element){ // fill in deeds table
        if (this.username == user_information.username && (this.date != null && this.date != -1)){ // find more elegant solution!!
            users_deed_history.push(this)
        }
    });

    $.each(RELATIONSHIPS_TABLE, function(element){ // return user data from information table
        if ((this.A == login_data.username || this.B == login_data.username) && this.date_ended == null){

            if (this.A == login_data.username){
                significant_other = this.B;
            } else {
                significant_other = this.A;
            }

            so_information = getUserInfo(significant_other);

            /*$.each(INFORMATION_TABLE, function(element){ // return SO data from information table
                if (this.username == significant_other){
                    so_information = this;
                    return false;
                }
            });*/

            //alert("SO FOUND! It's " + significant_other);
            localStorage.setItem("so_information", JSON.stringify(so_information));
            return false;
        } else {
            significant_other = null;
        }
    });


    /*Load User and SO information into page*/
    $("#profile_picture").attr("src","img/users/"+ login_data.username +".jpg");
    $(".firstname").text(user_information.first_name);
    $(".lastname").text(user_information.last_name);
    $("#description").text(user_information.description);

    /*Gender is used to different CSS*/
    var user_gender = getGender(user_information.gender);
    $(".gender").text(user_gender);
    $(".user_css").addClass(user_gender);


    if (significant_other != null){

        $("#ask_points").removeClass("hidden");
        $("#review_points").removeClass("hidden");
        //$("#relationship_tab").removeClass("hidden");

        $("#relationship_info").html("<b>Current "+ getGender(so_information.gender) +": </b>" + so_information.first_name + " <i class='fa fa-heart red'></i>");
        $(".so_name").text(so_information.first_name);
        $(".so_gender").text(getGender(so_information.gender));


    } else {

        //alert("User is currently single!");
        $("#relationship_info").html("<b><i>Looking for a new koibito! </i></b><i class='fa fa-heart-o red'></i>");
        $("#relationship_info").attr("href", "");
        $("#ask_points").addClass("hidden");
        $("#review_points").addClass("hidden");
        //$("#relationship_tab").addClass("hidden");
    }

    /*Calculate points*/
    $.each(users_deed_history, function(element){ // calculate points
        user_points += deed_points(this.deed);
    });

    //alert("Total points " + user_points);
    $(".total_points").text(user_points);
    $("#stars").html(individual_stars(user_points));
    $("#score").text(score(user_points));

    /*Load User History into page*/
    $.each(users_deed_history.slice(-6) , function(element){ // fill in deeds table
        $("#deeds_overview").prepend(
            "<div class='deed " + user_gender +"'>" +
            "<img src='img/deeds/"+ this.deed +".png'>" +
            "<h3 class='title'>" + user_information.first_name + " " + deed_description(this.deed) + "</h3>" +
            "<h6 class='date'>Endorsed by " + getFirstname(this.endorsed_by) + " <i class='fa fa-heart red'></i> on "+ formatDate(this.date) +"</h6>" +
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
        $("#" + this.id).find(".multiplier").text("(x"+ checkRepeated(this.id, requested_deeds) +")");
    }

    requested_deeds.push(this.id);
    //alert(requested_deeds.toString());
    $("#total_points").text(updatePoints(requested_deeds));

});

$("#submitRequest").click(function(){

    if (requested_deeds.length == 0){
        alert("You must select at least one deed before you can submit your request")
    } else {
        //alert(requested_deeds.toString());
        requested_deeds.forEach(function(item) {
            var new_record = {
                "username": user_information.username,
                "endorsed_by": so_information.username,
                "deed": item,
                "date": null
            };
            //alert(JSON.stringify(new_record));
            SESSION_HISTORY_TABLE.push(new_record)
        });

        sessionStorage.setItem("SESSION_HISTORY_TABLE", JSON.stringify(SESSION_HISTORY_TABLE));

        alert("SUCCESS! You have requested " + updatePoints(requested_deeds) + " " + getGender(user_information.gender) + " points!.\n(Points need to be approved by " + so_information.first_name + " " + so_information.last_name + " before they appear in your profile)");
        window.location.href = "profile.html";
    }

});

$("#resetPoints").click(function(){
    resetRequestPointsWindow();
});

function resetRequestPointsWindow() { // resets give points window
    requested_deeds = [];

    $("#deeds_list").empty();

    /*Load Deeds list into page*/
    $.each(DEEDS_TABLE, function(element){ // fill in deeds table
        //alert(JSON.stringify(this))
        $("#deeds_list").append(
            "<div class='deed wakashu clickable' id='"+ this.deed +"'>" +
            "<img src='img/deeds/"+this.deed+".png'>" +
            "<h3 class='title'>I " + this.description + "</h3>" +
            "<h4 class='points'><b>"+ this.points +" points <span class='multiplier'></span></b></h4>" +
            "</div>"
        )
    });

    $("#total_points").text(0);
}


function resetReviewPointsWindow() { // resets review points window

    selected_deeds = [];
    $("#review_list").empty();

    /*Load points that need review*/
    $.each(SESSION_HISTORY_TABLE , function(element){ // fill in deeds table
        if (this.endorsed_by == user_information.username && this.date == null){
            //alert(JSON.stringify(this))
            $("#review_list").prepend(
                "<div class='wakashu pending clickable' id='"+ this.deed +"'>" +
                "<div hidden='true'> <span class='label'>" + this.deed + "</span></div>" +
                "<img src='img/deeds/"+this.deed+".png'>" +
                "<h3 class='title'>" + getFirstname(this.username) + " " + deed_description(this.deed) + "</h3>" +
                "<h4 class='points'><b>"+ deed_points(this.deed) +" points</b></h4>" +
                "</div>"
            )
        }
    });

    $("#selected_points").text(0);
}

$(document).on('click','.pending',function(){
    //alert("You have clicked on a  pending deed " + this.id);
    if (!($("#" + this.id).hasClass("selected"))){
        $("#" + this.id).addClass("selected");
        selected_deeds.push(this.id);
    } else {
        $("#" + this.id).removeClass("selected");
        selected_deeds.pop(this.id);
    }

    //alert(selected_deeds.toString());
    $("#selected_points").text(updatePoints(selected_deeds));

});

$("#acceptPoints").click(function(){

    if (selected_deeds.length == 0){
        alert("You must select at least one deed!")
    } else {

        //alert(requested_deeds.toString());
        selected_deeds.forEach(function(item) {
            $.each(SESSION_HISTORY_TABLE , function(element){ // fill in deeds table
                if (this.endorsed_by == user_information.username && this.date == null && this.deed == item){
                    //alert("found! " +  JSON.stringify(this));
                    this.date = new Date();
                    //alert(JSON.stringify(this));
                    return 0;
                }
            });
        });

        sessionStorage.setItem("SESSION_HISTORY_TABLE", JSON.stringify(SESSION_HISTORY_TABLE));
        alert("SUCCESS! You have accepted the selected requested points!");
        window.location.href = "profile.html";
    }

});

$("#declinePoints").click(function(){

    if (selected_deeds.length == 0){
        alert("You must select at least one deed!")
    } else {

        selected_deeds.forEach(function(item) {
            $.each(SESSION_HISTORY_TABLE , function(element){ // fill in deeds table
                if (this.endorsed_by == user_information.username && this.date == null && this.deed == item){
                    //alert("found! " +  JSON.stringify(this));
                    this.date = -1; // flag for removal
                    //alert(JSON.stringify(this));
                    return 0;
                }
            });
        });
        //alert(JSON.stringify(SESSION_HISTORY_TABLE));
        sessionStorage.setItem("SESSION_HISTORY_TABLE", JSON.stringify(SESSION_HISTORY_TABLE));
        alert("SUCCESS! You have rejected the selected requested points!");
        window.location.href = "profile.html";
    }

});

/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

$(".view_partner").click(function() {
    //alert("Redirecting to partners profile now!");
    window.location.href = "partner.html";
});

$("#logoff").click(function() {
    localStorage.clear();
    window.location.href = "index.html";
});

/*Pop up windows*/
$("#ask_points").click(function() {
    $("#overlay").removeClass("hidden");
    $("#requestWindow").removeClass("hidden");
    resetRequestPointsWindow();
});

$("#review_points").click(function() {
    $("#overlay").removeClass("hidden");
    $("#reviewWindow").removeClass("hidden");
    resetReviewPointsWindow();
});


$(".close").click(function() {
    $("#overlay").addClass("hidden");
    $("#requestWindow").addClass("hidden");
    $("#reviewWindow").addClass("hidden");
});

function translate (index) {
    $("#page_title").text(page_title[index]);
}
