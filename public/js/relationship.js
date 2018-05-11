/** Koibito App
 *  relationship.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/* RELATIONSHIP PAGE SCRIPTS
* All scripts related to the relationship page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/
//On window load, fetching information and inserting it to the html document
document.addEventListener('DOMContentLoaded', function() {
    insertInformation();

}, false);

if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

function translate (index) {
    $("#page_title").text(page_title[index]);
}

function insertInformation(){
    	
   	

    // Getting Partners Name
    var tempUserName = document.cookie.split(",");

    /**************************************** Get User Information ******************************************/
    let userInformartion = queryUserInformation(tempUserName[0]);  // Login User
    let userPartnerInformation = queryUserInformation('eve4ever');             // partner of the Logined User
    

    //Add User's Relation History title
    document.getElementById('relationshipHistoryTitle').innerHTML = userInformartion[0].first_name + 
    		" Relationships History with " + userPartnerInformation[0].first_name;
    
    //Add User's Relation History Center title
    document.getElementById('centerTitle').innerHTML = userInformartion[0].first_name + 
    		'<i class="fa fa-heart fa-1x red"></i>' + userPartnerInformation[0].first_name;


   	// User and Partner Name Under the Images
   	document.getElementById('namePicture').innerHTML = userInformartion[0].first_name;
	document.getElementById('partnerName').innerHTML = userPartnerInformation[0].first_name;

	// get total of User's Points 
	var userPoints = totalUserPoint(tempUserName[0]);

	//check If the user has a partner 
	var partnerPoints = 0;
	if (!(tempUserName[1]=="")){
		partnerPoints = totalUserPoint(tempUserName[1]);
	}

	//get User Points with specific Partner
	var userPointsWithPartner = 0;
	userPointsWithPartner = totalUserPointWithCurrentPartner(tempUserName[0], tempUserName[1]);
	//get Partner points with Specific User
	var partnerPointsWithUser = 0;
	if (!(tempUserName[1]=="")){
		//get User Points with specific Partner
		partnerPointsWithUser = totalUserPointWithCurrentPartner(tempUserName[1], tempUserName[0]);
	}

	// Husbandu text and points
   	document.getElementById('userPoints').innerHTML = '<b>'+userPointsWithPartner+'</b> hasbandu points <b>in this relationship</b>';
	document.getElementById('totalUserPoints').innerHTML = '<b>'+partnerPointsWithUser+'</b> hasbandu points <b>in this relationship</b>';
	

	

	//Total Points In this Relationship
	document.getElementById('totalPoints').innerHTML =partnerPointsWithUser + userPointsWithPartner  ;


}
