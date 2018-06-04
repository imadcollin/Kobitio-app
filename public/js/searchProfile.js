/** Koibito App
 *  partner.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*PARTNER PAGE SCRIPTS
* All scripts related to the partner page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

//On window load, fetching information and inserting it to the html document
document.addEventListener('DOMContentLoaded', function() {
    insertInformation();

}, false);


/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

/*Pop up windows*/
$("#give_points").click(function() {
    $("#overlay").removeClass("hidden");
    $("#giveWindow").removeClass("hidden");
});

$(".close").click(function() {
    $("#overlay").addClass("hidden");
    $("#giveWindow").addClass("hidden")
});

function translate (index) {
    $("#page_title").text(page_title[index]);
}


function insertInformation(){
    
    // Getting Partners Name
    // var tempUserName = document.cookie.split(",");

    /**************************************** Get User Information ******************************************/
    let deeds = queryDeedsList();

    /**************************************** Get User Information ******************************************/
    let userInformartion = queryUserInformation(readCookie("searchProfileUsername"));             // partner of the Logined User

    //Check Gender 
    var gender = userInformartion[0].gender;
    if (gender == 0){
        gender = 'Hasbandu';
    }
    else if(gender == 1){
        gender = 'Waifu';
    }
    else{
        gender = 'Wakashu';
    }



    //Add User's Name
    document.getElementById('name').innerHTML = userInformartion[0].first_name + " " + userInformartion[0].last_name +" ("+ gender +")"; 
    //User Description
    document.getElementById("userDescription").innerHTML  = userInformartion[0].description;

    /********************************** Get User Deeds History ************************************/
    let userDeedsHistory =  queryUserDeedsHistory();
    var deedsHistortyLength = userDeedsHistory.length;

    var id;

}


