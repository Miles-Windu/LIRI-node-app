
// Require for dotenv package... ask what this does if you remember.
require("dotenv").config();

// Links the spotify id and secret
var keys = require("./keys.js");

// Ceates a constructor for the Spotify command. This will populate an object from the spotify information.
// var spotify = new Spotify(keys.spotify);

// Links Axios package to make calls to the API through node
var axios = require("axios");

// Takes the arguments from the command line and stores it in a variable to make it easier to call in my functions.
var search = process.argv[2];

//If the string from the command line equals "concert-this" then it will run the concertThis Function.
//If not then it will log out a message to create a valid entry to call the right function. 
if(search === "concert-this"){
  concertThis(search);
}else{
  console.log("Please enter a valid command.")
}


// This function makes a call the "bands in town" API. 
this.concertThis = function(name){

    //search query format and informtion. 
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(URL)
      .then(function(response){
        console.log(response)
    })

}

this.spotifyThisSong = function(song){


}

this.movieThis = function(movie){
axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);
}

this.doWhatItSays = function(listen){

}