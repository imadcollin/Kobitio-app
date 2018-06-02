/** Koibito App
 *  scripts.js
 *  Created by Mauro J. Pappaterra on 27 of May 2018.
 */

$(".link_profile").click(function(){
    window.location.href = "profile.html";
});

$(".link_so").click(function(){
    window.location.href = "partner.html";
});

$(".link_anon").click(function(){
    window.location.href = "anon_user.html";
});

function individual_stars (points, size){
    var stars = "";

    if (points < 1000) {
        stars = returnStars(1,size);
    } else {
        if (points < 4000){
            stars = returnStars(2,size);
        }else {
            if (points < 7000){
                stars = returnStars(3,size);
            }else {
                if (points < 10000){
                    stars = returnStars(4,size);
                } else {
                    if (points >= 10000){
                        stars = returnStars(5,size);
                    }
                }
            }
        }
    }
    return stars;
}

function returnStars (number, size){
    var stars = "";
    var icon = "";

    switch (size){
        case(0):
            icon = "<i class='fa fa-star fa stars'></i> "; // small stars
            break;
        case(1):
            icon = "<i class='fa fa-star fa-2x stars'></i> "; // medium stars
            break;
        case(2):
            icon = "<i class='fa fa-star fa-5x stars'></i> "; // big stars
            break;
    }

    switch (number){
        case(1):
            stars = icon;
            break;
        case(2):
            stars = icon + icon;
            break;
        case(3):
            stars = icon + icon + icon;
            break;
        case(4):
            stars = icon + icon + icon + icon;
            break;
        case(5):
            stars = icon + icon + icon + icon + icon;
            break;
    }
    return stars;
}

function score (points){
    var score = "";

    if (points < 1000) {
        score = "a lice-infested";
    } else {
        if (points < 4000){
            score = "a lousy";
        }else {
            if (points < 7000){
                score = "an average";
            }else {
                if (points < 10000){
                    score = "an excellent";
                } else {
                    if (points >= 10000){
                        score = "an amazing";
                    }
                }
            }
        }
    }
    return score;
}

function deed_description (deed){
    var description = "";
    $.each(DEEDS_TABLE, function(element){
        if (this.deed == deed){
            description = this.description;
            return;
        }
    });
    return description;
};

function deed_points (deed){
    var points = "";
    $.each(DEEDS_TABLE, function(element){
        if (this.deed == deed){
            points = this.points;
            return;
        }
    });
    return points;
};

function getFirstname (username){
    var first_name = "";
    $.each(INFORMATION_TABLE, function(element){
        if (this.username == username){
            first_name = this.first_name;
            return;
        }
    });
    return first_name;
};

function getGender (index){
    switch(index) {
        case 0:
            return "hasbandu";
        case 1:
            return "waifu";
        case 2:
            return "wakashu";
    }
}

function formatDate (date) {
    /* Returns formatted date as follows: "2018/03/19 at 21:00:00" */
    //alert(date);
    var date = new Date(date);
    var dd = date.getDate();
    var mm = formatMonth(date.getMonth());
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    var formatted_date = mm + " " + dd  + " " + yyyy +" at "+ hh +":"+ min +":"+ sec + " hs";
    //alert(formatted_date);
    return formatted_date;
}

function formatMonth (index){

    switch (index){
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
}

function timeTogether (start_date, finish_date){

    var start = new Date(start_date);
    var finish = new Date(finish_date);


    var totalyears = finish.getFullYear() - start.getFullYear();
    var totalmonths = finish.getMonth() - start.getMonth();
    var totaldays = finish.getDate() - start.getDate();

    return (totalyears + " years " + totalmonths + " months " + " and " + totaldays + " days" );
}

function updatePoints (pointsArray){
    var total_points = 0;

    pointsArray.forEach(function(item) {

        $.each(DEEDS_TABLE, function(element){

            if (this.deed == item){
                total_points += this.points;
                return 0;
            }
        });
    });

    return total_points;
}

function checkRepeated (deed, pointsArray){

    var multiplier = 1;
    pointsArray.forEach(function(item) {
        if(deed == item){
            multiplier += 1;
        }
    });

    return multiplier;
}

function activeRelationship (username_A, username_B){
    if (getSO(username_A) == username_B){
        return true;
    }
}


function hasSO (username){
    var result = false;
    $.each(RELATIONSHIPS_TABLE, function(element){
        if (this.A == username || this.B == username){
            if (this.date_ended == null){
                result = true;
            }
        }
    });
    return result;
}

function getSO (username){
    var so_username = null;
    $.each(RELATIONSHIPS_TABLE, function(element){
        if ((this.A == username || this.B == username) && this.date_ended == null){
            if (this.A == username){
                so_username = this.B;
            } else {
                so_username = this.A;
            }
        }
    });
    return so_username;
}

function getRelationshipStartDate (username_A, username_B){
    var startDate = null;

    $.each(RELATIONSHIPS_TABLE, function(element){
        if ((this.A == username_A && this.B == username_B) || (this.B == username_A && this.A == username_B)){
            startDate = this.date_started;
        }
    });
    return (new Date (startDate));
}

function getRelationshipEndDate (username_A, username_B){
    var endDate = null;

    $.each(RELATIONSHIPS_TABLE, function(element){
        if ((this.A == username_A && this.B == username_B) || (this.B == username_A && this.A == username_B)){
            if (this.date_ended == null){
                endDate = this.date_ended;
            }
        }
    });
    return (new Date (endDate));
}

function getSOHistory (username){
    var so_history = [];
    $.each(RELATIONSHIPS_TABLE, function(element){
        if ((this.A == username || this.B == username) && this.date_ended != null){
            if (this.A == username){
                so_history.push(this.B);
            } else {
                so_history.push(this.A);
            }
        }
    });
    return so_history;
}

function getUserInfo (username){
    var information = null;
    $.each(INFORMATION_TABLE, function(element){
        if (this.username == username){
            information = this;
        }
    });
    return information;
}

function getUserDeeds(username) {
    var userDeeds = [];
    $.each(SESSION_HISTORY_TABLE, function(element){ // fill in deeds table
        if (this.username == username && this.date != null && this.date != -1){ // find more elegant solution
            userDeeds.push(this)
        }
    });
    //alert(JSON.stringify(user_deeds));
    return userDeeds;
}

function getUserPoints (username) {
    var userDeeds = getUserDeeds(username);
    points = calculatePoints(userDeeds);
    return points;
}

function getRelationshipDeeds(username_A, username_B,) {
    var relationshipDeeds = [];
    $.each(SESSION_HISTORY_TABLE, function(element){ // fill in deeds table

        if ((this.username == username_A && this.endorsed_by == username_B) || (this.username == username_B && this.endorsed_by == username_A)  && this.date != -1){// find more elegant solution
            relationshipDeeds.push(this)
        }
    });
    return relationshipDeeds;
}

function calculatePoints(deeds_array) {
    var points = 0;
    $.each(deeds_array, function(element){ // calculate points
        points += deed_points(this.deed);
    });
    return points;
}

function calculatePointsInRelationship(username, deeds_array) {
    var points = 0;
    $.each(deeds_array, function(element){ // calculate points
        if (this.username == username){
            points += deed_points(this.deed);
        }
    });
    return points;
}

function percentage (points, total_points){
    if (total_points == 0){
        return 0;
    }
    return Math.round(points * 100 / total_points);
}

function equality_rate (percentage_a, percentage_b){
    var rate = 0;

    if ((percentage_a - percentage_b) == 0 || (percentage_b - percentage_a) == 0) {
        rate = 100.0;
    } else {
        rate = Math.round(100 / (Math.max(percentage_a, percentage_b) / Math.min(percentage_a, percentage_b)));
    }
    return rate;
}

function equality_difference (percentage_a, percentage_b) {
    var difference = Math.abs(percentage_a - percentage_b);
    return difference;
}

function relationshipStars (equality_difference, stars_size) {
    var relationshipStars = "";

    if (equality_difference > 70){
        relationshipStars = returnStars(1,stars_size);
    } else {
        if (equality_difference > 50){
            relationshipStars = returnStars(2,stars_size);
        } else {
            if (equality_difference > 30){
                relationshipStars = returnStars(3,stars_size);
            } else {
                if (equality_difference > 10){
                    relationshipStars = returnStars(4,stars_size);
                } else {
                    relationshipStars = returnStars(5,stars_size);
                }
            }
        }
    }
    return relationshipStars;
}

function relationshipVeredict (equality_difference) {
    var relationshipVeredict = "";
    if (equality_difference > 70){
        relationshipVeredict = "a pretty lousy";
    } else {
        if (equality_difference > 50){
            relationshipVeredict = "a lame";
        } else {
            if (equality_difference > 30){
                relationshipVeredict = "an average";
            } else {
                if (equality_difference > 10){
                    relationshipVeredict = "an amazing";
                } else {
                    relationshipVeredict = "an excellent";
                }
            }
        }
    }
    return relationshipVeredict;
}








