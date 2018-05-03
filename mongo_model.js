var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//***************************** User Schema *****************************/
var user_Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

/***************************** User Info Schema *****************************/
var userInfo_Schema = new Schema({
    username: {
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
    date_of_birth: {
        type: Date,
        required: true
    },
    // Genders are 0 = Hasbandu(male), 1 = Waifu(female), 2 = Wakashu(non-binary) 
    gender: {
        type: Number,
        required: true
    },
    //Interested in:
    hasbandu:Boolean,
    waifu:Boolean,
    wakashu:Boolean,

    description: String
});

/***************************** Relationships Schema *****************************/
var relationships_Schema = new Schema({
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
        type: Number,
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
    }
});

//***************************** Deeds History Schema *****************************/
var deedsHistory_Schema = new Schema({
    //both username and endorsed_by will be FK referring to users.
    username: {
        type: String,
        required: true,
    },
    endorsed_by: {
        type: String,
        required: true
    },
    deed_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});


// all the schemas above is useless so far....
// we need to create a model using it
var User = mongoose.model('User', user_Schema);
var UserInfo = mongoose.model('User_Info', userInfo_Schema);
var Relationships = mongoose.model('Relationships', relationships_Schema);
var Deeds = mongoose.model('Deeds', deeds_Schema);
var DeedsHistory = mongoose.model('Deeds_History', deedsHistory_Schema);


// make this available to our users in our Node applications
// module.exports = User;
// module.exports = UserInfo;
// module.exports = Relationships;
// module.exports = Deeds;
// module.exports = DeedsHistory;

// The models above are empty, but you should be able to insert,update and delete data to it.

//*************************   Dummy map!  ********************/
// Schema
function teacher_model(){
    var teacher_schema=new Schema({
        name:String
    });
//Model
    return mongoose.model('teacher',teacher_schema,'teacher');
}

//export
    module.exports.teacher_model=teacher_model;

 //**********************  End of  Dummy map!  ********************/
