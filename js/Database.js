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
 * 12/04/2019 - Created findHighScore() and findInitials() functions.
 * (Rachael Schutzman)
 *
 */

class Database {
   const MongoClient = require('mongodb').MongoClient;

   var url = "mongodb+srv://dbUser:$nak3!@cluster0-rmmze.mongodb.net/test?retryWrites=true&w=majority";
   
   // finds high score in database
   findHighScore () {
         MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("snake");
            var mysort = { player_score: -1 };
            dbo.collection("scores").find({}, { projection: { _id: 0, player_intl: 1, player_score: 1 } }).sort(mysort).toArray(function(err, result) {
                if (err) {
                    return highScore = 0;
                } else {
                    db.close();
                    return result[0].player_score;
                }
            });
         });
   }

   //finds initials associated with highscore in database
   findInitials () {
        MongoClient.connect(url, function(err, db) {
             if (err) throw err;
             var dbo = db.db("snake");
             var query = { player_score: + highScore };
             dbo.collection("scores").find(query).sort(mysort).toArray(function(err, result) {
                 if (err) throw err;
                 db.close();
                 return result[0].player_intl;
             });
        });
   }

  // inserts user provided initials and score from current game session into database
  insertInitialsAndScore () {


  }
  
  // finds top 10 scores from database and puts into array for display
  topScores() {

 }


}
