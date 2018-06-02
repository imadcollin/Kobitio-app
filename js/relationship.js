/** Koibito App
 *  relationship.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/* RELATIONSHIP PAGE SCRIPTS
* All scripts related to the relationship page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

/*LOAD CURRENT SECTION DATA FROM SESSION STORAGE*/
if (sessionStorage.getItem("SESSION_HISTORY_TABLE") == null){
    sessionStorage.setItem("SESSION_HISTORY_TABLE",JSON.stringify(HISTORY_TABLE));
    /*alert("History databases loaded from script!")
} else {
    alert("History database will be loaded from session storage!")*/
}

var SESSION_HISTORY_TABLE = JSON.parse(sessionStorage.getItem("SESSION_HISTORY_TABLE"));
var user_deed_history = []; // retrieve all user's deeds from HISTORY_TABLE
var so_deed_history = []; // retrieve all partner's deeds from HISTORY_TABLE
var relationship_deed_history = []; // retrieve couple's deeds from HISTORY_TABLE

var user_points = 0;
var user_points_relationship = 0;
var so_points = 0;
var so_points_relationship = 0;
var relationship_points = 0;

var user_percentage = 0.0;
var so_percentage = 0.0;
var gender_equality = 0.0;

var today = new Date(); // date variable for deed filtering
var filtered_user_points = 0;
var filtered_so_points = 0;

//alert(JSON.stringify(SESSION_HISTORY_TABLE));

/*Retrieve login information from localStorage*/
var so_information = localStorage.getItem("so_information");
var user_information = localStorage.getItem("user_information");
//alert(user_information);
//alert(so_information);

so_information = JSON.parse(so_information); // parse string back to JSON
user_information = JSON.parse(user_information);

if (so_information == null || !hasSO(user_information.username)){
    window.location.href = "profile.html";
} else {

    /*Load relationship information*/
    /*USER INFORMATION*/
    $(".profile_picture").attr("src","img/users/"+ user_information.username +".jpg");
    $(".firstname").text(user_information.first_name);
    $(".lastname").text(user_information.last_name);
    /*Gender will be used for different CSS styling*/
    var user_gender = getGender(user_information.gender);
    $(".gender").text(user_gender);
    $(".user_css").addClass(user_gender);

    /*SO INFORMATION*/
    $(".so_profile_picture").attr("src","img/users/"+ so_information.username +".jpg");
    $(".so_firstname").text(so_information.first_name);
    $(".so_lastname").text(so_information.last_name);
    /*Gender will be used for different CSS styling*/
    var so_gender = getGender(so_information.gender);
    $(".so_gender").text(so_gender);
    $(".so_css").addClass(so_gender);

    /*Retrieve SO deeds from HISTORY_TABLE*/
    $.each(SESSION_HISTORY_TABLE, function(element){ // fill in deeds table

        if (this.date != null && this.date != -1){ // find more elegant solution

            if (this.username == user_information.username){
                user_deed_history.push(this)
            }

            if (this.username == so_information.username){
                so_deed_history.push(this)
            }

            if ((this.username == user_information.username && this.endorsed_by == so_information.username) || (this.username == so_information.username && this.endorsed_by == user_information.username)){
                relationship_deed_history.push(this)
            }
        }
    });

    /*alert(JSON.stringify(user_deed_history));
    alert(JSON.stringify(so_deed_history));
    alert(JSON.stringify(relationship_deed_history));*/

    /*LOAD DATA USER*/
    $.each(user_deed_history, function(element){ // calculate points
        user_points += deed_points(this.deed);
    });

    $.each(relationship_deed_history, function(element){ // calculate points
        if (user_information.username == this.username){
            user_points_relationship += deed_points(this.deed);
        }
    });

    //alert("Total points " + user_points);
    $(".total_points").text(user_points);
    $(".user_points_relationship").text(user_points_relationship);
    $("#stars").html(individual_stars(user_points));
    $("#score").text(score(user_points));

    /*LOAD DATA SO*/
    $.each(so_deed_history, function(element){ // calculate points
        so_points += deed_points(this.deed);
    });
    $.each(relationship_deed_history, function(element){ // calculate points
        if (so_information.username == this.username){
            so_points_relationship += deed_points(this.deed);
        }
    });

    //alert("Total points " + user_points);
    $(".so_total_points").text(so_points);
    $(".so_points_relationship").text(so_points_relationship);
    $("#so_stars").html(individual_stars(so_points));
    $("#so_score").text(score(so_points));


    /*LOAD DATA COUPLE*/

    relationship_points = user_points_relationship + so_points_relationship;
    user_percentage = percentage(user_points_relationship,relationship_points);
    so_percentage = percentage(so_points_relationship,relationship_points);
    gender_equality = equality_rate(user_percentage, so_percentage);

    $(".points_together").text(relationship_points);

    var start = new Date(2001, 12, 20);
    var finish = new Date();//new Date(2002, 1, 1);

    $(".time_together").text(dateSubstraction(start,finish));

    $(".user_percentage").text(user_percentage);
    $(".so_percentage").text(so_percentage);
    $(".gender_equality").text(gender_equality);

    $("#user_bar").css("width",user_percentage+"%");
    $("#so_bar").css("width",so_percentage+"%");

    var difference = equality_difference(user_percentage, so_percentage);

    if (difference > 70){
        $("#big_stars").append(
            "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
            "<h2><b>" + user_information.first_name + " and " + so_information.first_name + " have a <u>pretty lousy</u> relationship!</b></h2>\n"
        );
    } else {
        if (difference > 50){
            $("#big_stars").append(
                "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                "<h2><b>" + user_information.first_name + " and " + so_information.first_name + " have a <u>lame</u> relationship!</b></h2>\n"
            );
        } else {
            if (difference > 30){

                $("#big_stars").append(
                    "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                    "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                    "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                    "<h2><b>" + user_information.first_name + " and " + so_information.first_name + " have an <u>average</u> relationship!</b></h2>\n"
                );

            } else {
                if (difference > 10){

                    $("#big_stars").append(
                        "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                        "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                        "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                        "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                        "<h2><b>" + user_information.first_name + " and " + so_information.first_name + " have an <u>excelent</u> relationship!</b></h2>\n" +
                        "");

                } else {

                    $("#big_stars").append(
                    "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                    "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                    "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                    "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                    "<i class=\"fa fa-star fa-5x stars\"></i>\n" +
                    "<h2><b>" + user_information.first_name + " and " + so_information.first_name + " have a <u>amazing</u> relationship!</b></h2>\n" +
                        "");
                }
            }
        }
    }
};

// Default filter
defaultFilter();

//filter buttons
$("#today").click(function(){
    defaultFilter();
});

function defaultFilter(){
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
        //alert (today);
        //alert (date_stamp);
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
}

$("#week").click(function(){
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
        //alert (today);
        //alert (date_stamp);
        if (deed_date.getDate() <= today.getDate() && deed_date.getDate() >= (today.getDate() - today.getDay()) && deed_date.getMonth() >= today.getMonth() -1 && deed_date.getFullYear() >= today.getFullYear() - 1){

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
        //alert (today);
        //alert (date_stamp);
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
    var a_gender = ""

    if (input_deed.username == user_information.username){
        a_gender = user_gender;
    } else {
        a_gender = so_gender;
    }

    $("#filtered_deeds").prepend(
        "<div class='deed "  + a_gender +"'>" +
        "<img src='img/deeds/"+ input_deed.deed +".png'>" +
        "<h3 class='title'>" + getFirstname(input_deed.username) + " " + deed_description(input_deed.deed) + "</h3>" +
        "<h6 class='date'>Endorsed by " + getFirstname(this.endorsed_by) + " <i class='fa fa-heart red'></i> on "+ formatDate(input_deed.date) +"</h6>" +
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

    var filtered_difference = equality_difference(filtered_user_percentage, filtered_so_percentage);
    $("#filter_results").empty();

    if (filtered_difference > 70){
        $("#filter_results").append("<i class=\"fa fa-flag-checkered\"></i> Lame Results!");
    } else {
        if (filtered_difference > 50){
            $("#filter_results").append("<i class=\"fa fa-flag-checkered\"></i> Bad Results!");
        } else {
            if (filtered_difference > 30){
                $("#filter_results").append("<i class=\"fa fa-flag-checkered\"></i> Average Results!");
            } else {
                if (filtered_difference > 10){
                    $("#filter_results").append("<i class=\"fa fa-flag-checkered\"></i> Excelent Results!");
                } else {
                    $("#filter_results").append("<i class=\"fa fa-flag-checkered\"></i> Amazing Results!");
                }
            }
        }
    }
};

function percentage (points, total_points){
    if (total_points == 0){
        return 0;
    }
    return Math.round(points * 100 / total_points);
}

function equality_rate (percentage_a, percentage_b){
    if (Math.min(percentage_a, percentage_b) == 0){
        return 100.0;
    }
    return Math.round(100 / (Math.max(percentage_a, percentage_b) / Math.min(percentage_a, percentage_b)));
}

function equality_difference (percentage_a, percentage_b) {
    return Math.abs(percentage_a - percentage_b);
}

/*Translations */
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

function translate (index) {
    $("#page_title").text(page_title[index]);
}