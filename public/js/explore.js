/** Koibito App
 *  explore.js
 *  Created by Hassan Odimi on 13 of June 2018.
 */

/* explore PAGE SCRIPTS
* All scripts related to the Explore page.
* The methods translate() is unique for each individual page.
*/

if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

function translate (index) {
    $("#page_title").text(PageTitle[index]);
    $("#MyProfile").text(MyProfile[index]);
    $("#CurrentRelation").text(CurrentRelation[index]);
    $("#RelationHistory").text(RelationHistory[index]);
    $("#About").text(About[index]);
    $("#Explore").text(Explore[index]);
}
