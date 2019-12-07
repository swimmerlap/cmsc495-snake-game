/* * * * * * * * * * * * * * * * *
 *    CMST 495 6380 Group 2      *
 * * * * * * * * * * * * * * * * *
 *
 * Name: Database.js
 * Author: Rachael Schutzman, Selamawit Asfaw, Danny Ramirez, Gilda Hogan, Gavin Spain
 * Description: Holds the Database class.
 *
 */

/* Revision History
 * 11/30/2019 - Initially created.
 * (Rachael Schutzman)
 * 
 * 12/07/2019 - Created the database connnection using Firebase, and the
 * gotData(), errorData() funcitons.
 * (Danny Ramirez)
 *
 */

class Database {

    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyBeVeyNVkJKXmeAFjMjOdejvHbmgEc2iic",
            authDomain: "cmsc-495-snake-game.firebaseapp.com",
            databaseURL: "https://cmsc-495-snake-game.firebaseio.com",
            projectId: "cmsc-495-snake-game",
            storageBucket: "cmsc-495-snake-game.appspot.com",
            messagingSenderId: "51076916688",
            appId: "1:51076916688:web:9782eedd2baf1292af45d5",
            measurementId: "G-785YJP9Y4M"
        };

        // Initialize Firebase
        firebase.initializeApp(this.firebaseConfig);
        firebase.analytics();

        this.collectionName = "scores";
        this.db = firebase.database();
        this.ref = this.db.ref(this.collectionName);

        if (debugOn) {
            console.log("Connected to the database!");
        }
    }

    gotData(data) {
        let scores = data.val();
        let keys = Object.keys(scores);
        keys.reverse();

        // Iterate through all the keys and get their values
        console.log("====== High Scores =======");
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            let initials = scores[k].initials;
            let score = scores[k].score;

            let li = createElement("li", `${initials}  ${score}`);
            li.parent("score-list");
            console.log(initials, score);
        }
        console.log("==========================");

    }

    errorData(error){
        console.log("There was an error retreiving the database data!");
        console.log(error);
    }

}
