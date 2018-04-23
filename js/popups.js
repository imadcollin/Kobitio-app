/** Koibito App
 *  popups.js
 *  Created by Mauro J. Pappaterra on 23 of April 2018.
 */


$("#login_button").click(function() {
    $("#overlay").removeClass("hidden");
    $("#loginWindow").removeClass("hidden");
});

$("#signup_button").click(function() {
    $("#overlay").removeClass("hidden");
    $("#signupWindow").removeClass("hidden");
});

$("#ask_points").click(function() {
    $("#overlay").removeClass("hidden");
    $("#requestWindow").removeClass("hidden");
});

$("#give_points").click(function() {
    $("#overlay").removeClass("hidden");
    $("#giveWindow").removeClass("hidden");
});

$(".close").click(function() {
    $("#overlay").addClass("hidden");
    $("#loginWindow").addClass("hidden");
    $("#signupWindow").addClass("hidden");
    $("#requestWindow").addClass("hidden");
    $("#giveWindow").addClass("hidden")

});

