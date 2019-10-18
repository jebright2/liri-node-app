require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require ("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require ("moment");

//Set to handle user input
var userCommand = process.argv[2]; 
var userChoice = process.argv.slice(3).join(" ");

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
        .then(function (response) {

    
        var concerts = response.data;
       

        for (var i = 0; i < concerts.length; i++) {

            console.log("*****EVENT INFORMATION******");
            fs.appendFileSync("log.txt", "*****EVENT INFORMATION******\n");
            console.log(i);
            fs.appendFileSync("log.txt", i + "\n");
            console.log("Venue: " + concerts[i].venue.name);
            fs.appendFileSync("log.txt", "Venue: " + concerts[i].venue.name + "\n");
            console.log("Location: " + concerts[i].venue.city + " (" + concerts[i].venue.latitude + ", " + concerts[i].venue.longitude + ")");
            fs.appendFileSync("log.txt", "Location: " + concerts[i].venue.city + " (" + concerts[i].venue.latitude + ", " + concerts[i].venue.longitude + ")" + "\n");
            var eventDate = moment(concerts[i].datetime).format("MM/DD/YYYY, HH:mm");
            console.log("Event Date & Time: " + eventDate);
            fs.appendFileSync("log.txt", "Event Date & Time: " + eventDate + "\n");
            console.log("*****************************");
            fs.appendFileSync("log.txt", "*****************************"+ "\n");
            
        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);

    })
 
    
} 

//Spotify
function songInfo(userChoice) {
    if (!userChoice) {
        userChoice = "The Sign, Ace of Base"; 
    }
    spotify.search(
        {
            type: "track",
            query: userChoice, limit: 3
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
                console.log("Song Name: " + songs[i].name);
                fs.appendFileSync("log.txt", "Song Name: " + songs[i].name + "\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "Preview Song: " + songs[i].preview_url + "\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "Album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "Artist(s): " + songs[i].artists[0].name + "\n");
                console.log("**************************");  
                fs.appendFileSync("log.txt", "**************************\n");
             }
        }
    );
};

//Movie Info
function movieInfo(userChoice){
    if (!userChoice) {
        userChoice = "Mr. Nobody"
        console.log("-----------------------");
        fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    else (axios.get("http://www.omdbapi.com/?t=" + userChoice + "&apikey=b3c0b435")
        .then(function(response) {
            //console.log(response);
    
        var movies = response.data;
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
    }) 
    .catch(function(error) {
        console.log(error);
}));

//function to get proper Rotten Tomatoes Rating
function getRottenTomatoesRatingObject (data) {
    return data.Ratings.find(function (item) {
       return item.Source === "Rotten Tomatoes";
    });
  }
  
  function getRottenTomatoesRatingValue (data) {
    return getRottenTomatoesRatingObject(data).Value;
  }
}

//function to read the random.txt file  
function doStuff() {
	fs.readFile("random.txt", "utf8", function(error, data){
		if (error){ 
			return console.log(error);
		}
        var dataArr = data.split(',');
        UserInput(dataArr[0], dataArr[1]);
	})
};  

