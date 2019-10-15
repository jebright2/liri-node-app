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
    axios.get("https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp")
        .then(function (error, response, body) {

    if(!error && response.statusCode === 200) {
        var concerts = JSON.parse (body);
        for (var i = 0; i < concerts.length; i++) {

            console.log("*****EVENT INFORMATION******");
            fs.appendFileSync("log.txt", "*****EVENT INFORMATION******\n");
            console.log(i);
            fs.appendFileSync("log.txt", i + "\n");
            console.log("Venue: " + concerts[i].venue.name);
            fs.appendFileSync("log.txt", "Venue: " + concerts[i].venue.name + "\n");
            console.log("Location: " + concerts[i].venue.city + ", " + concerts[i].venue.country);
            fs.appendFileSync("log.txt", "Location: " + concerts[i].venue.city + ", " + concerts[i].venue.country + "\n");
            console.log("Event Date: " + concerts[i].datetime);
            fs.appendFileSync("log.txt", "Event Date: " + concerts[i].datetime + "\n");
            console.log("*****************************");
            fs.appendFileSync("log.txt", "*****************************"+ "\n");
        }
    }
    else{
        console.log("Error occurred!");
      }

    })
}

//Spotify

function songInfo(userChoice) {
    if (userChoice === undefined) {
        userChoice = "The Sign"; 
    }
    spotify.search(
        {
            type: "track",
            query: userChoice
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("*****SONG INFO*****");
                fs.appendFileSync("log.txt", "*****SONG INFO*****\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("**************************");  
                fs.appendFileSync("log.txt", "**************************\n");
             }
        }
    );
};

//Movie Info

function movieInfo(userChoice){
    if (userChoice === undefined) {
        userChoice = "Mr. Nobody"
        console.log("-----------------------");
        fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    axios.get("http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=b3c0b435")
        .then(function(error, response, body) {
    // If the axios is successful
    if (!error && response.statusCode === 200) {
        var movies = JSON.parse(body);
        console.log("**********MOVIE INFO*********");  
        fs.appendFileSync("log.txt", "**********MOVIE INFO*********\n");
        console.log("Title: " + movies.Title);
        fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
        console.log("Release Year: " + movies.Year);
        fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
        console.log("IMDB Rating: " + movies.imdbRating);
        fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
        console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
        fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");
        console.log("Country of Production: " + movies.Country);
        fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
        console.log("Language: " + movies.Language);
        fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
        console.log("Plot: " + movies.Plot);
        fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
        console.log("Actors: " + movies.Actors);
        fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
        console.log("*****************************");  
        fs.appendFileSync("log.txt", "*****************************\n");
    } else{
      console.log('Error occurred.');
    }

});}

//function to get proper Rotten Tomatoes Rating
function getRottenTomatoesRatingObject (data) {
    return data.Ratings.find(function (item) {
       return item.Source === "Rotten Tomatoes";
    });
  }
  
  function getRottenTomatoesRatingValue (data) {
    return getRottenTomatoesRatingObject(data).Value;
  }

//function for reading out of random.txt file  
function doStuff(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        UserInput(dataArr[0], dataArr[1]);
	});
}