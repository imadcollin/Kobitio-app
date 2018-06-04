/** Koibito App
 *  relationship.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/* RELATIONSHIP PAGE SCRIPTS
* All scripts related to the relationship page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

/*Retrieve login information from localStorage*/
var login_data = JSON.parse(localStorage.getItem("login_data"));

if (!hasSO(login_data.username)){
    window.location.href = "profile.html"; // this view is only available to users in a relationship
} else {

    var user_information = getUserInfo(login_data.username);
    var so_information = getUserInfo(getSO(login_data.username));

    /*Load user information*/
    $(".profile_picture").attr("src","img/users/"+ user_information.username +".jpg");
    $(".firstname").text(user_information.first_name);
    $(".lastname").text(user_information.last_name);
    var user_gender = getGender(user_information.gender); // Gender will be used for different CSS styling
    $(".gender").text(user_gender);
    $(".user_css").addClass(user_gender);

    /*Load so information*/
    $(".so_profile_picture").attr("src","img/users/"+ so_information.username +".jpg");
    $(".so_firstname").text(so_information.first_name);
    $(".so_lastname").text(so_information.last_name);
    var so_gender = getGender(so_information.gender); // Gender will be used for different CSS styling
    $(".so_gender").text(so_gender);
    $(".so_css").addClass(so_gender);

    /*Retrieve all deeds from HISTORY_TABLE*/
    var user_deed_history = getUserDeeds(user_information.username); // retrieve all user's deeds
    var so_deed_history = getUserDeeds(so_information.username); // retrieve all partner's deeds
    var relationship_deed_history = getRelationshipDeeds(user_information.username,so_information.username);// retrieve couple's deeds
    //alert(JSON.stringify(relationship_deed_history));

    /*LOAD DATA USER*/
    var user_points = calculatePoints(user_deed_history);
    var user_points_relationship = calculatePointsInRelationship(user_information.username,relationship_deed_history);

    $(".total_points").text(user_points);
    $(".user_points_relationship").text(user_points_relationship);
    $("#stars").html(individual_stars(user_points, 0));
    $("#score").text(score(user_points));

    /*LOAD DATA SO*/
    var so_points = calculatePoints(so_deed_history);
    var so_points_relationship = calculatePointsInRelationship(so_information.username,relationship_deed_history);

    //alert("Total points " + user_points);
    $(".so_total_points").text(so_points);
    $(".so_points_relationship").text(so_points_relationship);
    $("#so_stars").html(individual_stars(so_points, 0));
    $("#so_score").text(score(so_points));

    /*LOAD DATA COUPLE*/
    var relationship_points = user_points_relationship + so_points_relationship;
    var user_percentage = percentage(user_points_relationship,relationship_points);
    var so_percentage = percentage(so_points_relationship,relationship_points);
    var gender_equality = equality_rate(user_percentage, so_percentage);

    $(".points_together").text(relationship_points);

    var start = new Date(2015, 12, 1); //getRelationshipStartDate(user_information.username, so_information.username);
    var finish = new Date();

    $(".time_together").text(timeTogether(start,finish));

    $(".user_percentage").text(user_percentage);
    $(".so_percentage").text(so_percentage);
    $(".gender_equality").text(gender_equality);

    $("#user_bar").css("width",user_percentage+"%");
    $("#so_bar").css("width",so_percentage+"%");

    var equality_difference = equality_difference(user_percentage, so_percentage);

    $("#big_stars").append( // get relationship stars & labels
        relationshipStars(equality_difference,2) + "<br>" +
        "<h2><b>" + user_information.first_name + " and " + so_information.first_name + " have " + relationshipVeredict(equality_difference) +" relationship!</b></h2>"
    );
};

// Deed Filtering functions, buttons and variables
var today = new Date(); // date variable for deed filtering
var filtered_user_points = 0;
var filtered_so_points = 0;
defaultFilter();

function defaultFilter(){
    $(".filter_label").text("This Week's");
    $(".filter_label_2").text("this week");

    $("#today").removeClass("filter_selected");
    $("#week").addClass("filter_selected");
    $("#month").removeClass("filter_selected");
    $("#year").removeClass("filter_selected");
    $("#alltimes").removeClass("filter_selected");

    $("#filtered_deeds").empty();
    filtered_so_points = 0;
    filtered_user_points = 0;
    /*Filter and load deeds into page*/
    $.each(relationship_deed_history, function(element){ // fill in deeds table
        var deed_date = new Date(this.date);

        if (deed_date.getDate() <= today.getDate() && deed_date.getDate() >= (today.getDate() - today.getDay()) && deed_date.getMonth() >= today.getMonth() -1 && deed_date.getFullYear() >= today.getFullYear() - 1){
            if (this.username == user_information.username){
                filtered_user_points += deed_points(this.deed);
            } else {
                filtered_so_points += deed_points(this.deed);
            }
            printDeed(this);
        }
    });
    printStats(filtered_user_points, filtered_so_points);
}

$("#today").click(function(){
    $(".filter_label").text("Today's");
    $(".filter_label_2").text("today");

    $("#today").addClass("filter_selected");
    $("#week").removeClass("filter_selected");
    $("#month").removeClass("filter_selected");
    $("#year").removeClass("filter_selected");
    $("#alltimes").removeClass("filter_selected");

    $("#filtered_deeds").empty();
    filtered_so_points = 0;
    filtered_user_points = 0;
    /*Filter and load deeds into page*/
    $.each(relationship_deed_history, function(element){ // fill in deeds table
        var deed_date = new Date(this.date);

        if (today.getDate() == deed_date.getDate() && today.getMonth() == deed_date.getMonth() && today.getFullYear() == deed_date.getFullYear()){
            // calculate points with filter settings
            if (this.username == user_information.username){
                filtered_user_points += deed_points(this.deed);
            } else {
                filtered_so_points += deed_points(this.deed);
            }
            printDeed(this);
        }
    });
    printStats(filtered_user_points, filtered_so_points);
});

$("#week").click(function(){ // This week is the default filter
    defaultFilter();
});

$("#month").click(function(){
    $(".filter_label").text("This Month's");
    $(".filter_label_2").text("this month");

    $("#today").removeClass("filter_selected");
    $("#week").removeClass("filter_selected");
    $("#month").addClass("filter_selected");
    $("#year").removeClass("filter_selected");
    $("#alltimes").removeClass("filter_selected");

    $("#filtered_deeds").empty();
    filtered_so_points = 0;
    filtered_user_points = 0;
    /*Filter and load deeds into page*/
    $.each(relationship_deed_history, function(element){ // fill in deeds table
        var deed_date = new Date(this.date);
        if (today.getMonth() == deed_date.getMonth() && today.getFullYear() == deed_date.getFullYear()){
            // calculate points with filter settings
            if (this.username == user_information.username){
                filtered_user_points += deed_points(this.deed);
            } else {
                filtered_so_points += deed_points(this.deed);
            }
            printDeed(this);
        }
    });
    printStats(filtered_user_points, filtered_so_points);
});

$("#year").click(function(){
    $(".filter_label").text("This Year's");
    $(".filter_label_2").text("this year");

    $("#today").removeClass("filter_selected");
    $("#week").removeClass("filter_selected");
    $("#month").removeClass("filter_selected");
    $("#year").addClass("filter_selected");
    $("#alltimes").removeClass("filter_selected");

    /*Reset Filtered box*/
    $("#filtered_deeds").empty();
    filtered_so_points = 0;
    filtered_user_points = 0;

    /*Filter and load deeds into page*/
    $.each(relationship_deed_history, function(element){ // fill in deeds table
        var deed_date = new Date(this.date);
        //alert (today);
        //alert (date_stamp);
        if (today.getFullYear() == deed_date.getFullYear()){
            // calculate points with filter settings
            if (this.username == user_information.username){
                filtered_user_points += deed_points(this.deed);
            } else {
                filtered_so_points += deed_points(this.deed);
            }
            printDeed(this);
        }
    });
    printStats(filtered_user_points, filtered_so_points);
});

$("#alltimes").click(function(){
    $(".filter_label").text("All time's");
    $(".filter_label_2").text("all times");

    $("#today").removeClass("filter_selected");
    $("#week").removeClass("filter_selected");
    $("#month").removeClass("filter_selected");
    $("#year").removeClass("filter_selected");
    $("#alltimes").addClass("filter_selected");

    $("#filtered_deeds").empty();
    filtered_so_points = 0;
    filtered_user_points = 0;
    /*Filter and load deeds into page*/
    $.each(relationship_deed_history, function(element){ // fill in deeds table

        // calculate points with filter settings
        if (this.username == user_information.username){
            filtered_user_points += deed_points(this.deed);
        } else {
            filtered_so_points += deed_points(this.deed);
        }
        printDeed(this);
    });
    printStats(filtered_user_points, filtered_so_points);

});

function printDeed (input_deed){
    var a_gender = "";
    var add_link = "";

    if (input_deed.username == user_information.username){
        a_gender = user_gender;
        add_link = " <span class='link_white link_so'> "; // link to so profile

    } else {
        a_gender = so_gender;
        add_link = " <span class='link_white link_profile'> "; // link to user profile
    }

    $("#filtered_deeds").prepend(
        "<div class='deed "  + a_gender +"'>" +
        "<img src='img/deeds/"+ input_deed.deed +".png'>" +
        "<h3 class='title'>" + getFirstname(input_deed.username) + " " + deed_description(input_deed.deed) + "</h3>" +
        "<h6 class='date'>Endorsed by" + add_link + getFirstname(input_deed.endorsed_by)+ "</span> <i class='fa fa-heart red'></i> on "+ formatDate(input_deed.date) +"</h6>" +
        "<h4 class='points'><b>+"+ deed_points(input_deed.deed)+" points</b></h4>" +
        "</div>"
    )
}

function printStats (filtered_user_points, filtered_so_points){
    var filtered_total_points = filtered_user_points + filtered_so_points;
    var filtered_user_percentage = percentage(filtered_user_points,filtered_total_points);
    var filtered_so_percentage = percentage(filtered_so_points,filtered_total_points);
    var filtered_gender_equality = equality_rate(filtered_user_percentage, filtered_so_percentage);

    $("#filtered_so_points").text(filtered_so_points);
    $("#filtered_user_points").text(filtered_user_points);
    $("#filtered_total_points").text(filtered_total_points);


    $(".filtered_user_percentage").text(filtered_user_percentage);
    $(".filtered_so_percentage").text(filtered_so_percentage);

    $("#filtered_equality_rate").text(filtered_gender_equality);

    $("#filtered_user_bar").css("width",filtered_user_percentage+"%");
    $("#filtered_so_bar").css("width",filtered_so_percentage+"%");

    //alert(filtered_user_percentage + "%");
    //alert(filtered_so_percentage+ "%");
    /*var filtered_difference = equality_difference(filtered_user_percentage, filtered_so_percentage);
    alert(filtered_difference); // there is a bug among these few lines*/

    $("#filter_results").empty();
    $("#filter_results").append("<i class='fa fa-flag-checkered'></i>" + getFilteredResults(35)); // filtered difference should be the argument
}

function getFilteredResults(filtered_difference){
    var veredict = "";

    if (filtered_difference > 70){
        veredict = "Lame Results";
    }
    if (filtered_difference > 50){
        veredict = "Bad Results";
    }
    if (filtered_difference > 30){
        veredict = "Average Results!";
    }
    if (filtered_difference > 10){
        veredict = "Excellent Results!";
    }
    if (filtered_difference <= 10){
        veredict = "Amazing Results!";
    }

    return veredict;
}

/*Translations */
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

function translate (index) {
    $("#page_title").text(page_title[index]);
}