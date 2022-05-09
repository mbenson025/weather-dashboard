//document ready function
$(function (){


//global variables
var apiKey = 'b6a631faf48ec36736fa91299da2f0a2';
var cityWeather;
var recentHistory;

let data = [];


function corsError() {
var queryURL = `http://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}`;


$.ajax({
  type: 'GET',
  url: queryURL,

  }).then(function() {
        console.log();

});

}


// eventListeners-----
$('searchBtn').on('click', cityWeather);

});