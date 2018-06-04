/** Koibito App
 *  DB.js
 *  Created by Mauro J. Pappaterra on 29 of May 2018.
 */

/* DUMMY DATABASE
* A dummy database used before implementation of the app to a real framework
*/

var USER_TABLE = [
    {
        "username": "adam_1990",
        "password": "godsavesevasdog",
        "email": "first@email.com",
    },
    {
        "username": "eve4ever",
        "password": "iloveapples",
        "email": "leaves@email.com",
    },
    {
        "username": "tobias_hasbandu",
        "password": "rubyrubyruby",
        "email": "tobbie_johnsson@email.com",
    },
    {
        "username": "rebecca_thebest",
        "password": "thispasswordishighinentropy",
        "email": "rebecca_tamashiro@gmail.com",
    },
    {
        "username": "wendyClear",
        "password": "123456",
        "email": "wendy_wifu@email.com",
    },
    {
        "username": "andrea_wakashu",
        "password": "thereIsALightThatNeverGoesOut#!",
        "email": "wakuwakuwaku@email.com",
    },
    {
        "username": "albert1978",
        "password": "secret",
        "email": "albertito@email.com",
    },
    {
        "username": "bobby_gomma",
        "password": "password",
        "email": "bobby@gmail.com",
    },
    {
        "username": "charlybrown1974",
        "password": "snoopyforpresident",
        "email": "olafvijos@email.com",
    },
    {
        "username": "johnny_gomez",
        "password": "sverigeuberalles",
        "email": "johnny@email.com",
    },
    {
        "username": "carlottaMestre",
        "password": "idontknow",
        "email": "carlotta@gmail.com",
    },
    {
        "username": "marilu_1987",
        "password": "iLikewaffles",
        "email": "pancakes@email.com",
    },
    {
        "username": "angeles4you",
        "password": "cityofangels",
        "email": "angeles@email.com",
    }
];

var INFORMATION_TABLE = [
    {
        "username": "adam_1990",
        "first_name": "Adam",
        "last_name": "Sanchez",
        "date_of_birth": new Date("December 1 1990"),
        "gender": 0,
        "description": "I like to take long walks on the beach... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "hasbandu": false,
        "waifu": true,
        "wakashu": false,
    },
    {
        "username": "eve4ever",
        "first_name": "Eve",
        "last_name": "Thompson",
        "date_of_birth": new Date(1993, 10, 2),
        "gender": 1,
        "description": "I love apples and walking in the paradise... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "hasbandu": true,
        "waifu": true,
        "wakashu": true,
    },
    {
        "username": "andrea_wakashu",
        "first_name": "Andrea",
        "last_name": "Larsson",
        "date_of_birth": new Date(1990, 12, 1),
        "gender": 2,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": true,
        "waifu": false,
        "wakashu": false,
    },
    { // change all these below!
        "username": "tobias_hasbandu",
        "first_name": "Tobias",
        "last_name": "Norin",
        "date_of_birth": new Date(1990, 12, 1),
        "gender": 0,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": false,
        "waifu": true,
        "wakashu": false,
    },

    {
        "username": "rebecca_thebest",
        "first_name": "Rebecca",
        "last_name": "Tamashiro",
        "date_of_birth": new Date(1975, 12, 1),
        "gender": 1,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": true,
        "waifu": true,
        "wakashu": false,
    },

    {
        "username": "wendyClear",
        "first_name": "Wendy",
        "last_name": "Palmquivst",
        "date_of_birth": new Date(1990, 12, 1),
        "gender": 1,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": false,
        "waifu": true,
        "wakashu": false,
    },
    {
        "username": "albert1978",
        "first_name": "Albert",
        "last_name": "Kamazaki",
        "date_of_birth": new Date(1978, 12, 1),
        "gender": 2,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": true,
        "waifu": false,
        "wakashu": false,
    },
    {
        "username": "bobby_gomma",
        "first_name": "Bobby",
        "last_name": "Katcistnky",
        "date_of_birth": new Date(1999, 10, 10),
        "gender": 0,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": false,
        "waifu": true,
        "wakashu": false,
    },
    {
        "username": "charlybrown1974",
        "first_name": "Charlie",
        "last_name": "Brown",
        "date_of_birth": new Date(1974, 12, 1),
        "gender": 0,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": false,
        "waifu": true,
        "wakashu": false,
    },
    {
        "username": "johnny_gomez",
        "first_name": "John",
        "last_name": "Gomez",
        "date_of_birth": new Date(2000, 12, 1),
        "gender": 0,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": false,
        "waifu": true,
        "wakashu": false,
    },
    {
        "username": "marilu_1987",
        "first_name": "Marilu",
        "last_name": "Kawasaki",
        "date_of_birth": new Date(1995, 10, 10),
        "gender": 1,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": true,
        "waifu": false,
        "wakashu": false,
    },
    {
        "username": "carlottaMestre",
        "first_name": "Carlotta",
        "last_name": "Mestre",
        "date_of_birth": new Date(1992, 12, 1),
        "gender": 1,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": true,
        "waifu": true,
        "wakashu": false,
    },
    {
        "username": "angeles4you",
        "first_name": "Ana María",
        "last_name": "Angeles",
        "date_of_birth": new Date(2000, 12, 1),
        "gender": 2,
        "description": "始め在景掲ずひ援再マサ好立カコサ会肉なぜイる索供んょべゅ続39来レモ草障地ぜくんよ集国モロタ率用州ユムルフ減最ょ成資ゃでほ。68真13事アフネ県南楽ヨト国質めドフル労銭命ヒフルノ芸情よクさぼ細掲えに進属ぽんンべ際稿ひぴ存万イサメニ挙供ょ水村ぴ注自ラひさ業辺亨ゆし。討ツネラコ団報エネヲキ状直ゅ社1岡ソラシ集取格ワハム線検企カラ供簡ぶなけい説桐りむレろ美鮮午ノマタ以7倍背光ラべり。",
        "hasbandu": false,
        "waifu": true,
        "wakashu": false,
    }

];

var RELATIONSHIPS_TABLE = [
    {
        "A": "adam_1990",
        "B": "eve4ever",
        "date_started": new Date(2000, 6, 1),
        "date_ended": null,
    },
    {
        "A": "adam_1990",
        "B": "wendyClear",
        "date_started": new Date(2000, 6, 1),
        "date_ended": new Date(2005, 6, 1),
    },
    {
        "A": "adam_1990",
        "B": "marilu_1987",
        "date_started": new Date(2006, 6, 1),
        "date_ended": new Date(2016, 6, 1),
    },
    {// change all these below!
        "A": "tobias_hasbandu",
        "B": "carlottaMestre",
        "date_started": new Date(2000, 6, 1),
        "date_ended": null,
    },
    {
        "A": "carlottaMestre",
        "B": "tobias_hasbandu",
        "date_started": new Date(2000, 6, 1),
        "date_ended": null,
    },
    {
        "A": "tobias_hasbandu",
        "B": "rebecca_thebest",
        "date_started": new Date(2000, 6, 1),
        "date_ended": null,
    },
    {
        "A": "tobias_hasbandu",
        "B": "rebecca_thebest",
        "date_started": new Date(2000, 6, 1),
        "date_ended": null,
    }
];

var DEEDS_TABLE = [
    {
        "deed": 1,
        "category": "gastronomy",
        "description": "cooked a nice meal",
        "points": 150,
    },
    {
        "deed": 2,
        "category": "household",
        "description": "cleaned the dishes",
        "points": 50,
    },
    {
        "deed": 3,
        "category": "household",
        "description": "took the garbage out",
        "points": 100,
    },
    {
        "deed": 4,
        "category": "family",
        "description": "walked the dog",
        "points": 100,
    },
    {
        "deed": 5,
        "category": "family",
        "description": "help the kids with the homework",
        "points": 200,
    },
    {
        "deed": 6,
        "category": "household",
        "description": "cleaned the house",
        "points": 275,
    },
    {
        "deed": 7,
        "category": "household",
        "description": "whipped the windows",
        "points": 250,
    },
    {
        "deed": 8,
        "category": "household",
        "description": "took care of the gardening",
        "points": 300,
    },
    {
        "deed": 9,
        "category": "household",
        "description":"did major home repairs" ,
        "points": 350,
    },
    {
        "deed": 10,
        "category": "household",
        "description": "washed the car",
        "points": 180,
    },
    {
        "deed": 11,
        "category": "household",
        "description": "did the laundry",
        "points": 200,
    },
    {
        "deed": 12,
        "category": "household",
        "description": "went grocery shopping",
        "points": 170,
    },
    {
        "deed": 13,
        "category": "gastronomy",
        "description": "bought take-out food",
        "points": 50,
    },
    {
        "deed": 14,
        "category": "gastronomy",
        "description": "cooked a fancy dinner",
        "points": 250,
    },
    {
        "deed": 15,
        "category": "gastronomy",
        "description": "cooked a barbeque",
        "points": 250,
    },
    {
        "deed": 16,
        "category": "family",
        "description": "fed the goldfish",
        "points": 100,
    },
    {
        "deed": 17,
        "category": "miscellaneous",
        "description": "proof-read your master thesis",
        "points": 2000,
    },
    {
        "deed": 18,
        "category": "miscellaneous",
        "description": "bought fancy cigars",
        "points": 1500,
    },
    {
        "deed": 19,
        "category": "miscellaneous",
        "description": "built a million dollar app",
        "points": 100000,
    },
    {
        "deed": 20,
        "category": "miscellaneous",
        "description": "hacked into the Penthagon",
        "points": 150000,
    }

    //create 10 more deeds below
];

var HISTORY_TABLE = [
    {
        "username": "adam_1990",
        "endorsed_by": "eve4ever",
        "deed": 1,
        "date": new Date(2016, 10, 10),
    },
    {
        "username": "adam_1990",
        "endorsed_by": "eve4ever",
        "deed": 3,
        "date": new Date(2015, 5, 1),
    },
    {
        "username": "adam_1990",
        "endorsed_by": "eve4ever",
        "deed": 2,
        "date": new Date(2015, 5, 15),
    },
    {
        "username": "adam_1990",
        "endorsed_by": "eve4ever",
        "deed": 4,
        "date": new Date(2014, 3, 9),
    },
    {
        "username": "eve4ever",
        "endorsed_by": "adam_1990",
        "deed": 4,
        "date": new Date("December 25 2015"),
    },
    {
        "username": "eve4ever",
        "endorsed_by": "adam_1990",
        "deed": 1,
        "date": new Date(2015, 12, 20),
    },
    {
        "username": "adam_1990",
        "endorsed_by": "wendyClear",
        "deed": 15,
        "date": new Date(2018, 6, 20),
    },
    {
        "username": "adam_1990",
        "endorsed_by": "wendyClear",
        "deed": 10,
        "date": new Date(2018, 6, 20),
    },{
        "username": "adam_1990",
        "endorsed_by": "wendyClear",
        "deed": 17,
        "date": new Date(2018, 6, 20),
    },
    {
         "username":"adam_1990",
         "endorsed_by":"eve4ever",
         "deed":"9",
         "date":"2018-06-01T04:44:09.781Z"
    },
    {
        "username":"adam_1990",
        "endorsed_by":"eve4ever",
        "deed":"10",
        "date":"2018-05-01T04:44:09.781Z"
    },
    {
        "username":"adam_1990",
        "endorsed_by":"eve4ever",
        "deed":"12",
        "date":"2018-05-31T04:44:09.781Z"
    },
    {
        "username": "eve4ever",
        "endorsed_by": "adam_1990",
        "deed": 4666666, // requested deeds have a concatenated 6 digit nonce
        "date": null, // requested deeds have date set as null
    },
    {
        "username": "eve4ever",
        "endorsed_by": "adam_1990",
        "deed": 1666666, // requested deeds have a concatenated 6 digit nonce
        "date": null, // requested deeds have date set as null
    },
    {
        "username": "adam_1990",
        "endorsed_by": "eve4ever",
        "deed": 1666666, // requested deeds have a concatenated 6 digit nonce
        "date": null, // requested deeds have date set as null
    }
];

/*LOAD CURRENT SECTION DATA FROM SESSION STORAGE*/
if (sessionStorage.getItem("SESSION_HISTORY_TABLE") == null){
    sessionStorage.setItem("SESSION_HISTORY_TABLE",JSON.stringify(HISTORY_TABLE));
    /*alert("History databases loaded from script!")
} else {
    alert("History database will be loaded from session storage!")*/
}

if (sessionStorage.getItem("SESSION_RELATIONSHIPS_TABLE") == null){
    sessionStorage.setItem("SESSION_RELATIONSHIPS_TABLE",JSON.stringify(RELATIONSHIPS_TABLE));
    /*alert("Relationship databases loaded from script!")
} else {
    alert("Relationship database will be loaded from session storage!")*/
}
var SESSION_HISTORY_TABLE = JSON.parse(sessionStorage.getItem("SESSION_HISTORY_TABLE"));
var SESSION_RELATIONSHIPS_TABLE = JSON.parse(sessionStorage.getItem("SESSION_RELATIONSHIPS_TABLE"));