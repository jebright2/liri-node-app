require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require ("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Set to handle user input
var userCommand = process.argv[2]; 
var userChoice = process.argv[3];

UserInput(userCommand, userChoice);

//User Command Function
function UserInput (userCommand, userChoice) {
    switch(userCommand) {
        case "concert-this":
            concertInfo(userChoice);
            break;
        
        case "spotify-this-song":
            songInfo(userChoice);
            break;

        case "movie-this":
            movieInfo(userChoice);
            break;

        case "do-what-it-says":
            doStuff(userChoice);
            break;

        default:
            console.log("Error! Please use one of the following commands to initiate your search: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
    }

}

//Function for Concert Information

function concertInfo(userChoice) {
    var queryURL = "https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp";
    axios (queryURL, function (error, response, body) {

    if(!error && response.statusCode === 200) {
        var concerts = JSON.parse (body);
        for (var i = 0; i < concerts.length; i++) {

            console.log("*****EVENT INFORMATION******");
            fs.appendFileSync("log.txt", "*****EVENT INFORMATION******\n");
            console.log(i);
            fs.appendFileSync("log.txt", i+"\n");
            
        }
    }

    })
}