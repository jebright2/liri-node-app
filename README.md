# liri-node-app

### URL
https://github.com/jebright2/liri-node-app

### Overview

* LIRI is a Language Interpretation and Recognition Interface.
* The LIRI 'bot' will be a command line node app that takes in parameters and gives you back data.
* This application will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
* There are 4 comands that must be used to communicate with LIRI bot:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

**Example 1** `concert-this`:
Successful search!
![concert-screen](/images/concert-error.PNG)

**Example 2** `spotify-this-song`:
Successful search (code: Limit 3 results)
![spotify-screen](/images/Spotify.PNG)

**Example 3** `movie-this`:
Successful search!
![movie-screen](/images/movie-this-error.PNG)

**Example 4** `do-what-it-says`:
Successful search of the random.txt file
![random-screen](/images/do-what-it-says.PNG)

**Example 5** Default:
What happens when an invalid command is entered
![default-screen](/images/default.PNG)

## Liri Demo
[![Liri-demo](/images/LiriDemo.jpeg)](https://drive.google.com/drive/u/0/folders/1tWQPNUkBOVU0X5W88RAI5JefC1NNH0ji) 
 
### Technologies Used

* Javascript
* Nodejs
* Node packages:
    * Node-Spotify-API
    * Axios
    * File-System
    * Moment
    * DotEnv
* APIs used:
    * Spotify
    * Bands in Town
    * OMDB  