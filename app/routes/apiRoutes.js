var friends = require("../data/friends.js");

module.exports = function(app) {
    
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        // Parse result of user survey
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);
        
        // calculate difference between user scores and friend scores
        var totalDifference = 0;

        // loop through friends in friends.js
        for (var i = 0; i < friends.length; i++) {
            
            console.log(friends[i]);
            totalDifference = 0;

            // loop through friend scores in friends.js
            for (var j = 0; j < friends[i].scores[j]; j++) {

                // calculate difference between scores and sum into totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // if sum of differences is less than differences of current match
                if (totalDifference <= bestMatch.friendDifference) {

                    // reset bestMatch to be new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // save user data to db
        friends.push(userData); 

        // return JSON with bestMatch
        res.json(bestMatch);

    });
}