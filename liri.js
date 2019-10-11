require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require('moment');
var Spotify = require('node-spotify-api');

//Set to handle user input
var userCommand = process.argv[2]; 
var userChoice = process.argv[3];

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

        default:"Error! Please use one of the following commands to initiate your search: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says"
    }

}

UserInput();