/** Koibito App
 *  explore.js
 *  Created by Mauro J. Pappaterra on 24 of May 2018.
 */

/*EXPLORE PAGE SCRIPTS
* All scripts related to the explore page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

/*Retrieve login information from localStorage*/
var login_data = localStorage.getItem("login_data");

if (login_data == null){
    window.location.href = "index.html";
} else {

    login_data = JSON.parse(login_data);
    $.each(USER_TABLE, function(element){ // fill in deeds table

        var user_info = getUserInfo(this.username);
        //alert(JSON.stringify(user_info));

        if (user_info.username != login_data.username){
            $("#load_profiles").append(
                "<div class='user_profile " + getGender(user_info.gender) + " clickable' id='"+ user_info.username +"'>" +
                "<h3 class='center'>"+ user_info.first_name +"</h3>" +
                "<img src='img/users/"+ user_info.username +".jpg'>" +
                "<div class='center'>" +
                "<i class='fa fa-star stars'></i>" +
                "<i class='fa fa-star stars'></i>" +
                "<i class='fa fa-star stars'></i>" +
                "<i class='fa fa-star stars'></i>" +
                "<i class='fa fa-star stars'></i>" +
                "<p><b>" + user_info.first_name + " is <u>amazing</u>!</b></p>" +
                "</div>" +
                "</div>"
            )
        }
    });
}

$(document).on('click','.user_profile',function(){
    var profile_id = $(this).attr('id');
    //alert("You have clicked on the profile of " + profile_id);
    localStorage.setItem("anon_username", profile_id);
    window.location.href = "anon_user.html";
});
