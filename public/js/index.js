/** Koibito App
 *  history.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*INDEX PAGE SCRIPTS
 * All scripts related to the index page. Each page has their own scripts in a single js document.
 * The methods translate() is unique for each individual page.
 */
/*Language Translation index*/
if (localStorage.getItem("index") == null) {
    localStorage.setItem("index", 0)
}

/*Pop up windows*/
$("#login_button").click(function () {
    $("#overlay").removeClass("hidden");
    $("#loginWindow").removeClass("hidden");
});

$("#signup_button").click(function () {
    $("#overlay").removeClass("hidden");
    $("#signupWindow").removeClass("hidden");
});

$("#give_points").click(function () {
    $("#overlay").removeClass("hidden");
    $("#giveWindow").removeClass("hidden");
});

$(".close").click(function () {
    $("#overlay").addClass("hidden");
    $("#loginWindow").addClass("hidden");
    $("#signupWindow").addClass("hidden");
});

function translate(index) {
    $("#page_title").text(page_title[index]);
    $("#mission").text(mission[index]);
    $("#login_button").text(login_button[index]);
    $("#signup_button").text(signup_button[index]);

}

function login() {
    let user_name = document.getElementById("userName").value;
    let password = document.getElementById("Password").value;

   if( user_name == "adam_1990" && password == "123456") {

       window.location.href = "profile.html"
   }else{
       alert('Loaded but Something went wrong Please provide valid Password or UserName');
        window.location.href = "index.html"
   }
}
// var delay = 2000;

setTimeout(test, delay)