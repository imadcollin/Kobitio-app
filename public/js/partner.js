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
    
    /**************************************** Get User Information ******************************************/
    let deeds = getDeedsList();

    /**************************************** Get User Information ******************************************/
    let userInformartion = getUserInformation();
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
    let userDeedsHistory =  getUserDeedsHistory();
    var deedsHistortyLength = userDeedsHistory.length;

    var id;

    // for (var i = 0; i < deedsHistortyLength; i++) {
        
    //     //Deed Id 
    //     id = userDeedsHistory[i].deed_id;
    //     console.log(deeds[id].description);

    //     // document.getElementById('overviewList').innerHTML = '<div class="deed wakashu">'+
    //     //         '<img src="img/deeds/D00001.png">'+
    //     //         '<h3 class="title">'+deeds[id].description+'</h3>'+
    //     //         '<h4 class="points"><b>'+deeds[id].points+' points</b></h4></div>'

    //     document.getElementById('overviewList').innerHTML = '<li class="list-group-item" >'+
    //                 '<div ><img src="https://png.icons8.com/color/96/000000/vegan-food.png" ></div>'+
    //                 '<div><h3 class="title">'+deeds[id].description+'</h3>'+
    //                 '<h6 class="date">Endorsed by Eve <i class="fa fa-heart red"></i> on 12/12/1999</h6></div>'+
    //                  '<div><h4 class="points"><b>'+deeds[id].points+ 'points</b></h4></div></li>'


    // }

}








































