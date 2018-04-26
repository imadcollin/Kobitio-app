/** Koibito App
 *  profile.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*PROFILE PAGE SCRIPTS
* All scripts related to the profile page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

/*Pop up windows*/
$("#ask_points").click(function() {
    $("#overlay").removeClass("hidden");
    $("#requestWindow").removeClass("hidden");
});


$(".close").click(function() {
    $("#overlay").addClass("hidden");
    $("#requestWindow").addClass("hidden");
});

function translate (index) {
    $("#page_title").text(page_title[index]);
}


// Code for Edit profile pop-up window and form
// Get the modal
var modal = document.getElementById('editProfileModal');

// Get the button that opens the modal
var btn = document.getElementById("editProfile");



// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}



// Edit Settings Pop-up Window 

var SettingModal = document.getElementById('editSettingeModal');

// Get the button that opens the modal
var EditSettingButton = document.getElementById("editSetting");

// Get the <span> element that closes the modal

// When the user clicks the button, open the modal 
EditSettingButton.onclick = function() {
    SettingModal.style.display = "block";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == SettingModal) {
        SettingModal.style.display = "none";
    }
}



// Get the <span> element that closes the modal
var close = document.getElementById("close-form");
// When the user clicks on <span> (x), close the modal
close.onclick = function() {

	//getting the id of main modal
	parentDiv = document.getElementById("close-form").parentElement.parentElement.parentElement.parentElement;
    parentDiv.style.display = "none";

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

