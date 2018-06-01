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

function individual_stars (points){
    var stars = "";

    if (points < 1000) {
        stars = "<i class='fa fa-star fa-2x stars'></i>";
    } else {
        if (points < 4000){
            stars = "<i class='fa fa-star fa-2x stars'></i>" +
                " <i class='fa fa-star fa-2x stars'></i>";
        }else {
            if (points < 7000){
                stars = "<i class='fa fa-star fa-2x stars'></i>" +
                    " <i class='fa fa-star fa-2x stars'></i>" +
                    " <i class='fa fa-star fa-2x stars'></i>";
            }else {
                if (points < 10000){
                    stars = "<i class='fa fa-star fa-2x stars'></i>" +
                        " <i class='fa fa-star fa-2x stars'></i>" +
                        " <i class='fa fa-star fa-2x stars'></i>" +
                        " <i class='fa fa-star fa-2x stars'></i>";
                } else {
                    if (points >= 10000){
                        stars = "<i class='fa fa-star fa-2x stars'></i>" +
                            " <i class='fa fa-star fa-2x stars'></i>" +
                            " <i class='fa fa-star fa-2x stars'></i>" +
                            " <i class='fa fa-star fa-2x stars'></i>" +
                            " <i class='fa fa-star fa-2x stars'></i>";
                    }
                }
            }
        }
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

function user_firstname (username){
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

function dateSubstraction (start_date, finish_date){

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