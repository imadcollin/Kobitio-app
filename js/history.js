/** Koibito App
 *  history.js
 *  Created by Mauro J. Pappaterra on 24 of April 2018.
 */

/*HISTORY PAGE SCRIPTS
* All scripts related to the history page. Each page has their own scripts in a single js document.
* The methods translate() is unique for each individual page.
*/

/*Language Translation index*/
if (localStorage.getItem("index") == null){
    localStorage.setItem("index",0)
}

function translate (index) {
    $("#page_title").text(page_title[index]);
}