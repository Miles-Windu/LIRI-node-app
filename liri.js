
// Require for dotenv package... ask what this does if you remember.
require("dotenv").config();

// Links the spotify id and secret
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

// Linkig time formatting javacript
var moment = require('moment');

var fs = require('fs');
// Ceates a constructor for the Spotify command. This will populate an object from the spotify information.
var spotify = new Spotify(keys.spotify);

// Links Axios package to make calls to the API through node
var axios = require("axios");

// Takes the arguments from the command line and stores it in a variable to make it easier to call in my functions.
var search = process.argv[2];

var term = process.argv.slice(3).join(" ");

//If the string from the command line equals "concert-this" then it will run the concertThis Function.
//If not then it will log out a message to create a valid entry to call the right function. 
if(search === "concert-this"){
 concertThis(term);
}

if(search === "spotify-this-song"){
  spotifyThisSong(term);
}

if(search === "movie-this"){
  movieThis(term);
}

if(search === "do-what-it-says"){
  doWhatItSays(term);
}

if(!search){
  console.log("Please input a search!")
}

// ==================================================================================================

// This function makes a call the "bands in town" API. 
function concertThis() {

    //search query format and informtion. 
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

    //axios call
    axios.get(URL)
      .then(function(response){

        // Makes it easy to reference the object in my script
        var jsonData = response.data[0];
        var time = moment(jsonData.datetime).format("dddd, MMMM Do YYYY, h:mm:ss a");
        var divider = "\n" + "-------------------------------------------------" + "\n";
        // gathering all my data from the response of the API
        var showData = [
          "\nCommand: " + search,
          "Artist: " + term, 
          "Venue: " + jsonData.venue.name,
          "Location: " + jsonData.venue.city + ', ' + jsonData.venue.country,
          "Date of Event: " + time,
          divider
        ].join('\n\n');

        console.log(showData)

        fs.appendFile('log.txt', showData, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
    })

}

// This function makes a call to the "node-spotify-api" 
function spotifyThisSong() {

  // Straight outta the docs... 
  spotify.search({ type: 'track', query: term, limit: 1 })
  .then(function(response) {

    // renaming the path to the item in the response object
    var jsonData = response.tracks.items[0].album

    var divider = "\n" + "-------------------------------------------------" + "\n";
    // organizing the data into an array to call and display in the terminal and txt file. 
    var showData = [
      "\nCommand: " + search, 
      "Artist: " + jsonData.artists[0].name,
      "Song Name: " + term, 
      "Preview: " + jsonData.external_urls.spotify, 
      "Album: " + jsonData.name,
      divider

    ].join("\n\n");

    // log the data in the terminal to make sure everything is solid. 
    console.log(showData);

    // log data to the txt file. 
    fs.appendFile('log.txt', showData, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  })
  .catch(function(err) {
    console.log(err);
  });

}

// Function that makes a call to the "OMDB" API. 
function movieThis(){

    // If there is no search term then it will default to Mr. Nobody.
  if(!term){
    term = "Mr. Nobody"
  }
  // Axios call to the omdb api 
axios.get("http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=706d7459").then(
  function(response) {
    var jsonData = response.data
    var divider = "\n" + "-------------------------------------------------" + "\n";
    // Put in the information to an array to organize the data. 
    var showData = [
      "\nCommand: " + search,
      "Title: " + jsonData.Title,
      "Year: " + jsonData.Year, 
      "IMDB Rating: " + jsonData.imdbRating, 
      "Country: " + jsonData.Country,
      "Language: " + jsonData.Language, 
      "Plot: " + jsonData.Plot, 
      "Actors: " + jsonData.Actors,
      divider
    ].join('\n\n')

    // Console log the data 
    console.log(showData);

    

    // append the information to the log.txt file 
    fs.appendFile('log.txt', showData, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
);
}

function doWhatItSays() {


}