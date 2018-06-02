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

/*Retrieve login information from localStorage*/
var login_data = localStorage.getItem("login_data");

if (login_data == null){
    window.location.href = "index.html";
} else {

    login_data = JSON.parse(login_data);
    var user_information = getUserInfo(login_data.username);
    var so_information = getUserInfo(getSO(login_data.username));
    var so_history = getSOHistory(login_data.username);


    if (so_information != null){



        $("#load_so").append(

            "<div class='history'>" +
                "<h3 class='center'>" + user_information.first_name + "<i class='fa fa-heart fa-1x red'></i> "+ so_information.first_name +"</h3>" +

                "<div class='c1 "+ getGender(user_information.gender) +"'>" +
                    "<img src='img/users/"+ user_information.username +".jpg'>" +

                    "<div class='center'>" +
                        "<i class='fa fa-star stars'></i>" +
                        "<p><b>" + user_information.first_name + " is <u>lame</u></b></p>" +
                        "</div>" +
                        "<p><b>300</b> "+ getGender(user_information.gender) +" points <b>in this relationship</b></p>" +
                    "</div>" +

                "<div class='c2 "+ getGender(so_information.gender) +"'>" +

                    "<img src='img/users/"+ so_information.username +".jpg'>" +
                    "<div class='center'>" +
                        "<i class='fa fa-star stars'></i>" +
                        "<i class='fa fa-star stars'></i>" +
                        "<i class='fa fa-star stars'></i>" +
                        "<i class='fa fa-star stars'></i>" +
                        "<i class='fa fa-star stars'></i>" +
                        "<p><b>" + so_information.first_name +" is <u>amazing</u>!</b></p>" +
                    "</div>" +
                    "<p><b>10000</b> "+ getGender(so_information.gender)+" points <b>in this relationship</b></p>" +
                    "</div>" +

                "<div class='c3 info'>" +
                    "<h3 class='center'>Relationship <i class='fa fa-heartbeat fa-1x red'></i> Stats</h3>" +

                    "<div class='center'>" +
                        "<i class='fa fa-star fa-2x stars'></i>" +
                        "<i class='fa fa-star fa-2x stars'></i>" +
                        "<i class='fa fa-star-half-empty fa-2x stars'></i>" +
                        "<p><b>" + user_information.first_name + " and " + so_information.first_name +" have a <u>pretty lousy</u> relationship!</b></p>" +
                    "</div>" +

                    "<div class='progress progress-small'>" +
                    "<div class='progress-bar progress-bar-striped "+ getGender(user_information.gender) +" bar active' role='progressbar' aria-valuenow='65' aria-valuemin='0' aria-valuemax='100' style='width: 25%'>" +
                    user_information.first_name + "25%" +
                    "</div>" +
                    "<div class='progress-bar progress-bar-striped " + getGender(so_information.gender) + " bar active' role='progressbar' aria-valuenow='65' aria-valuemin='0' aria-valuemax='100' style='width:75%'>" +
                    so_information.first_name + "75%" +
                    "</div>" +
                    "</div>" +

                    "<h5>Gender Equality Rate: <b>0.3</b></h5>" +
                    "<h5>Total points together: <b>10300</b></h5>" +
                    "<h5>Lenght of relationship: <b>1 Year 6 Months 3 Weeks 4 Days</b></h5>" +
                "</div>" +

        "</div>"
        );
    }






}

/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

function translate (index) {
    $("#page_title").text(page_title[index]);
}