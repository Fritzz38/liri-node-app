
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var userArgument = process.argv[2];


switch (userArgument) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifyThis();
	break;

	case "movie-this":
	movieThis();
	break;

	case "do-what-it-says":
	doWhatItSays();
	break;
}



function myTweets() {

  var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var params = { screen_name: 'tsidhar', count: 2};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

  	for (i = 0; i < tweets.length; i++) {    
    console.log("Tweets: " + tweets[i].text);
    console.log("Created at: " + tweets[i].created_at);
    console.log("------------------------------")
    }
  }
});


}

// var client = new Twitter({
//   consumer_key: keys.twitterKeys.consumer_key,
//   consumer_secret: keys.twitterKeys.consumer_secret,
//   access_token_key: keys.twitterKeys.access_token_key,
//   access_token_secret: keys.twitterKeys.access_token_secret
// });

// var tweet = { status: 'Coding is fun'}

// client.post('statuses/update', tweet, function(error, data, response) {
//   if (!error) {
//     console.log(data);
//   }
// });



//search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

function spotifyThis(song) {

var spotify = new Spotify({
  id: 'cb6b14492dda4863b1ff63f13e9fe65c',
  secret: '19aa280683414cedbb3ebc41bc447e1f'
});
 
song = process.argv[3];

if (song === undefined) {
	song = "With or Without You";
}

spotify.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
    var results = data.tracks.items[0];
 	console.log("Song: " + results.name); 	
 	console.log("Artist: " + results.artists[0].name);
 	console.log("Album: " + results.album.name);
 	console.log("Preview Link: " + results.preview_url);
});


}
 


function movieThis () {

var movie = process.argv[3];

if (movie === undefined) {
	movie = "Mr Nobody";
}

var searchURL = "http://www.omdbapi.com/?apikey=40e9cece&t=" + movie + "&y=&plot=short&r=json";

request(searchURL, function (error, response, body) {

  console.log("Title: " + JSON.parse(body).Title);
  console.log("Year: " + JSON.parse(body).Year);
  console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
  console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value); 
  console.log("Country: " + JSON.parse(body).Country);
  console.log("Language: " + JSON.parse(body).Language);
  console.log("Plot: " + JSON.parse(body).Plot);
  console.log("Actors: " + JSON.parse(body).Actors);
  
});


}



function doWhatItSays() {

 fs.readFile("random.txt", "utf8", function(err, data) {
 	var res = data.split(",");
  
  	var params = res[1];
  	var spotify = new Spotify({
        id: 'cb6b14492dda4863b1ff63f13e9fe65c',
        secret: '19aa280683414cedbb3ebc41bc447e1f'
        });

  spotify.search({ type: 'track', query: params }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
    var results = data.tracks.items[0];
 	console.log("Song: " + results.name); 	
 	console.log("Artist: " + results.artists[0].name);
 	console.log("Album: " + results.album.name);
 	console.log("Preview Link: " + results.preview_url);
});
  

 });

}
