/** Koibito App
 *  history.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*INDEX PAGE SCRIPTS
* All scripts related to the index page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

/*Login Scripts*/
function loginScript (login_data){
    var username = login_data.user_name.value; //"andrea_wakashu";//"adam_1990";
    var password = login_data.password.value; //"thereIsALightThatNeverGoesOut#!";//"godsavesevasdog";
    var exist = false;

    //alert("Login in as " + username + " with password " + password);

    $.each(USER_TABLE, function(element){
        if (this.username == username){
            exist = true;
            if (this.password == password){
                //alert("SUCCESS! Username and password match!\n" + JSON.stringify(this));
                localStorage.setItem("login_data", JSON.stringify(this));
                window.location.replace("profile.html");
            } else {
                alert ("ERROR! Password is incorrect!")
                return false;
            }
        }
    });

    if (!exist){
        alert ("ERROR! Username is not registered in Koibito")
    }

};


/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

/*Pop up windows*/
$("#login_button").click(function() {
    $("#overlay").removeClass("hidden");
    $("#loginWindow").removeClass("hidden");
});

$("#signup_button").click(function() {
    $("#overlay").removeClass("hidden");
    $("#signupWindow").removeClass("hidden");
});

$("#give_points").click(function() {
    $("#overlay").removeClass("hidden");
    $("#giveWindow").removeClass("hidden");
});

$(".close").click(function() {
    $("#overlay").addClass("hidden");
    $("#loginWindow").addClass("hidden");
    $("#signupWindow").addClass("hidden");
});

function translate (index) {
    $("#page_title").text(page_title[index]);
    $("#mission").text(mission[index]);
    $("#login_button").text(login_button[index]);
    $("#signup_button").text(signup_button[index]);

}
