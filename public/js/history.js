/** Koibito App
 *  history.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*HISTORY PAGE SCRIPTS
* All scripts related to the history page. Each page has their own scripts in a single js document.
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

function translate (index) {
    $("#page_title").text(page_title[index]);
}

// Total Points of the User
function totalUserPoint(userName){
	/**************************************** Get User Information ******************************************/
    let deeds = queryDeedsList();

	/********************************** Get User Deeds History ************************************/
    let userDeedsHistory =  queryUserDeedsHistory(userName);
    var deedsHistortyLength = userDeedsHistory.length;
    var id;
    var points = 0;

    for (var i = 0; i < deedsHistortyLength; i++) {    
        //Deed Id 
        id = userDeedsHistory[i].deed_id - 1;
        points = points + parseInt(deeds[id].points);
    }

    return points;
}

// Total Points of the User in relationsjip with this partner
function totalUserPointWithCurrentPartner(userName, partnerName){

	/**************************************** Get User Information ******************************************/
    let deeds = queryDeedsList();

	/********************************** Get User Deeds History ************************************/
    let userDeedsHistory =  queryUserDeedsHistory(userName);
    var deedsHistortyLength = userDeedsHistory.length;
    var id;
    var points = 0;

    for (var i = 0; i < deedsHistortyLength; i++) {   
    	//check if the deeds points are assignment by the partner 
    	if (userDeedsHistory[i].endorsed_by == partnerName) {
    		//Deed Id 
	        id = userDeedsHistory[i].deed_id - 1;
	        points = points + parseInt(deeds[id].points);
    	}         
    }

    return points;
}



function insertInformation(){
    	
    // Getting Partners Name
    // var tempUserName = document.cookie.split(",");

    /**************************************** Get User Information ******************************************/
    let userInformartion = queryUserInformation(readCookie("username"));  // Login User
    let userPartnerInformation = queryUserInformation(readCookie("partner"));             // partner of the Logined User
    

    //Add User's Relation History title
    document.getElementById('relationshipHistoryTitle').innerHTML = userInformartion[0].first_name + 
    		" Relationships History with " + userPartnerInformation[0].first_name;
    
    //Add User's Relation History Center title
    document.getElementById('centerTitle').innerHTML = userInformartion[0].first_name + 
    		'<i class="fa fa-heart fa-1x red"></i>' + userPartnerInformation[0].first_name;


   	// User and Partner Name Under the Images
   	document.getElementById('userName').innerHTML = userInformartion[0].first_name;
	document.getElementById('partnerName').innerHTML = userPartnerInformation[0].first_name;

	// get total of User's Points 
	var userPoints = totalUserPoint(userInformartion[0]);

	//check If the user has a partner 
	var partnerPoints = 0;
	if (!(userInformartion[0]=="")){
		partnerPoints = totalUserPoint(userPartnerInformation[0]);
	}

	//get User Points with specific Partner
	var userPointsWithPartner = 0;
	userPointsWithPartner = totalUserPointWithCurrentPartner(userInformartion[0], userPartnerInformation[0]);
	//get Partner points with Specific User
	var partnerPointsWithUser = 0;
	if (!(userPartnerInformation[0]=="")){
		//get User Points with specific Partner
		partnerPointsWithUser = totalUserPointWithCurrentPartner(userPartnerInformation[0], userInformartion[0]);
	}

	// Husbandu Points and Waifu points
   	document.getElementById('husbanduPoints').innerHTML = userPointsWithPartner + " ";
	document.getElementById('waifuPoints').innerHTML = partnerPointsWithUser + " ";
	

	//Total Points In this Relationship
	document.getElementById('totalPoints').innerHTML =partnerPointsWithUser + userPointsWithPartner  ;


}
