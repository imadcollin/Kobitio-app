var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//***************************** User Schema *****************************/
var user_Schema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

/***************************** User Info Schema *****************************/
var userInfo_Schema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },

    description: String
});

/***************************** Couples Schema *****************************/
var couples_Schema = new Schema({
    user_A: {
        type: String,
        required: true
    },
    user_B: {
        type: String,
        required: true
    },

    date_started: Date,
    date_finished: Date,
});

/***************************** Deeds Schema ********************************/
var deeds_Schema = new Schema({
    deed_id: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    points: {
        /*The min and max values can be deleted, but it is better to have it to build a clear 
        rewards system or points distribution system later*/
        type: Number,
        min: 10,
        max: 1000,
        required: true
    },

    date_started: Date,
    date_finished: Date,
});

//***************************** Deeds History Schema *****************************/
var deedsHistory_Schema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    SO: {
        //significant other:a person with whom someone has an established romantic or sexual relationship.
        type: String,
        required: true
    },
    deed_id: {
        type: String,
        required: true
    },
    time_stamp: {
        type: Date,
        required: true
    },

    date_started: Date,
    date_finished: Date,
});

//***************************** Orientation Schema *****************************/
/*hasbandu will be true if the user interested in men, 
while waifu true for those who are interested in women*/
var orientation_Schema = new Schema({
    user_id: {
        type: String,
        required: true,
    },

    hasbandu: Boolean,
    waifu: Boolean,

    // extra option could be added later
    //Wakashu:Boolean
});


// all the schemas above is useless so far....
// we need to create a model using it
var User = mongoose.model('User', user_Schema);
var UserInfo = mongoose.model('User_Info', userInfo_Schema);
var Couples = mongoose.model('Couples', couples_Schema);
var Deeds = mongoose.model('Deeds', deeds_Schema);
var DeedsHistory = mongoose.model('Deeds_History', deedsHistory_Schema);
var Orientation = mongoose.model('Orientaion', orientation_Schema);


// make this available to our users in our Node applications
module.exports = User;
module.exports = UserInfo;
module.exports = Couples;
module.exports = Deeds;
module.exports = DeedsHistory;
module.exports = Orientation;

// The models above are empty, but you should be able to insert,update and delete data to it.
