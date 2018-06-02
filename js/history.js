/** Koibito App
 *  history.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*HISTORY PAGE SCRIPTS
* All scripts related to the history page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

loadSessionDB();
var SESSION_HISTORY_TABLE = JSON.parse(sessionStorage.getItem("SESSION_HISTORY_TABLE"));
var SESSION_RELATIONSHIPS_TABLE = JSON.parse(sessionStorage.getItem("SESSION_RELATIONSHIPS_TABLE"));

/*Retrieve login information from localStorage*/
var login_data = localStorage.getItem("login_data");

if (login_data == null){
    window.location.href = "index.html";
} else {

    login_data = JSON.parse(login_data);

    var user_information = getUserInfo(login_data.username);
    var so_information = getUserInfo(getSO(login_data.username));
    var so_history = getSOHistory(login_data.username);
    //alert("relationship history: " + JSON.stringify(so_history));

    var relationship_deed_history =[];
    var user_points = 0;
    var so_points = 0;

    var relationship_points = user_points + so_points;
    var user_percentage = percentage(user_points, relationship_points);
    var so_percentage = percentage(so_points,relationship_points);
    var gender_equality = equality_rate(user_percentage, so_percentage);

    if (so_information != null){

        relationship_deed_history = getRelationshipDeeds(user_information.username,so_information.username);// retrieve couple's deeds
        user_points = calculatePointsInRelationship(user_information.username, relationship_deed_history)
        so_points = calculatePointsInRelationship(so_information.username, relationship_deed_history);

        relationship_points = user_points + so_points;
        user_percentage = percentage(user_points, relationship_points);
        so_percentage = percentage(so_points,relationship_points);
        gender_equality = equality_rate(user_percentage, so_percentage);

        var start = new Date(2001, 12, 20);
        var finish = new Date();

        $("#load_so").append(

            "<div class='history'>" +
            "<h3 class='center'>" + user_information.first_name + "<i class='fa fa-heart fa-1x red'></i> "+ so_information.first_name +"</h3>" +

            "<div class='c1 "+ getGender(user_information.gender) +"'>" +
            "<img src='img/users/"+ user_information.username +".jpg'>" +

            "<div class='center'>" + individual_stars(user_points, 0)  +
            "<p><b>" + user_information.first_name + " is " + score(user_points) +" " + getGender(user_information.gender) + "!</b></p>" +
            "</div>" +
            "<p><b>"+ user_points +"</b> "+ getGender(user_information.gender) + " points <b>in this relationship</b></p>" +
            "</div>" +

            "<div class='c2 "+ getGender(so_information.gender) +"'>" +

            "<img src='img/users/"+ so_information.username +".jpg'>" +
            "<div class='center'>" + individual_stars(so_points, 0)  +
            "<p><b>" + so_information.first_name +" is "+ score(so_points) +" " + getGender(so_information.gender) + "!</b></p>" +
            "</div>" +
            "<p><b>"+ so_points +"</b> "+ getGender(so_information.gender)+" points <b>in this relationship</b></p>" +
            "</div>" +

            "<div class='c3 info'>" +
            "<h3 class='center'>Relationship <i class='fa fa-heartbeat fa-1x red'></i> Stats</h3>" +

            "<div class='center'>" +
            relationshipStars (equality_difference,1) +
            "<p><b>" + user_information.first_name + " and " + so_information.first_name +" have "+ relationshipVeredict(equality_difference) +" relationship!</b></p>" +
            "</div>" +

            "<div class='progress progress-small'>" +
            "<div class='progress-bar progress-bar-striped "+ getGender(user_information.gender) +" bar active' role='progressbar' aria-valuenow='65' aria-valuemin='0' aria-valuemax='100' style='width:"+ user_percentage +"%'>" +
            user_information.first_name + " " + user_percentage + "%" +
            "</div>" +
            "<div class='progress-bar progress-bar-striped " + getGender(so_information.gender) + " bar active' role='progressbar' aria-valuenow='65' aria-valuemin='0' aria-valuemax='100' style='width:" + so_percentage + "%'>" +
            so_information.first_name + " " + so_percentage + "%" +
            "</div>" +
            "</div>" +

            "<h5>Gender Equality Rate: <b>"+ gender_equality +"</b></h5>" +
            "<h5>Total points together: <b>" + relationship_points + "</b></h5>" +
            "<h5>Lenght of relationship: <b>" + timeTogether(start,finish) +"</b></h5>" +
            "</div>" +

            "</div>"
        );
    }

    $.each(so_history, function(element){

        so_information = getUserInfo(this);

        relationship_deed_history = getRelationshipDeeds(user_information.username,so_information.username);// retrieve couple's deeds
        user_points = calculatePointsInRelationship(user_information.username, relationship_deed_history)
        so_points = calculatePointsInRelationship(this, relationship_deed_history);

        relationship_points = user_points + so_points;
        user_percentage = percentage(user_points, relationship_points);
        so_percentage = percentage(so_points,relationship_points);
        gender_equality = equality_rate(user_percentage, so_percentage);

        var start = new Date(2001, 12, 20);
        var finish = new Date();

        $("#load_history").append(

            "<div class='history'>" +
            "<h3 class='center'>" + user_information.first_name + "<i class='fa fa-heart-o fa-1x red'></i> "+ so_information.first_name +"</h3>" +

            "<div class='c1 "+ getGender(user_information.gender) +"'>" +
            "<img src='img/users/"+ user_information.username +".jpg'>" +

            "<div class='center'>" + individual_stars(user_points, 0)  +
            "<p><b>" + user_information.first_name + " is " + score(user_points) +" " + getGender(user_information.gender) + "!</b></p>" +
            "</div>" +
            "<p><b>"+ user_points +"</b> "+ getGender(user_information.gender) + " points <b>in this relationship</b></p>" +
            "</div>" +

            "<div class='c2 "+ getGender(so_information.gender) +"'>" +

            "<img src='img/users/"+ so_information.username +".jpg'>" +
            "<div class='center'>" + individual_stars(so_points, 0)  +
            "<p><b>" + so_information.first_name +" is "+ score(so_points) +" " + getGender(so_information.gender) + "!</b></p>" +
            "</div>" +
            "<p><b>"+ so_points +"</b> "+ getGender(so_information.gender)+" points <b>in this relationship</b></p>" +
            "</div>" +

            "<div class='c3 info'>" +
            "<h3 class='center'>Relationship <i class='fa fa-heartbeat fa-1x red'></i> Stats</h3>" +

            "<div class='center'>" +
            relationshipStars (equality_difference,1) +
            "<p><b>" + user_information.first_name + " and " + so_information.first_name +" had "+ relationshipVeredict(equality_difference) +" relationship!</b></p>" +
            "</div>" +

            "<div class='progress progress-small'>" +
            "<div class='progress-bar progress-bar-striped "+ getGender(user_information.gender) +" bar active' role='progressbar' aria-valuenow='65' aria-valuemin='0' aria-valuemax='100' style='width:"+ user_percentage +"%'>" +
            user_information.first_name + " " + user_percentage + "%" +
            "</div>" +
            "<div class='progress-bar progress-bar-striped " + getGender(so_information.gender) + " bar active' role='progressbar' aria-valuenow='65' aria-valuemin='0' aria-valuemax='100' style='width:" + so_percentage + "%'>" +
            so_information.first_name + " " + so_percentage + "%" +
            "</div>" +
            "</div>" +

            "<h5>Gender Equality Rate: <b>"+ gender_equality +"</b></h5>" +
            "<h5>Total points together: <b>" + relationship_points + "</b></h5>" +
            "<h5>Lenght of relationship: <b>" + timeTogether(start,finish) +"</b></h5>" +
            "</div>" +

            "</div>"
        );
    });
}

/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

function translate (index) {
    $("#page_title").text(page_title[index]);
}