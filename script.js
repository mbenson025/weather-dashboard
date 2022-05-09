//document ready function
// $(function (){
// });

//global variables
var apiKey = 'b6a631faf48ec36736fa91299da2f0a2';
var cityWeather;
var recentHistory;
var lat;
var lon;
var temp;
var wind;
var humidity;
var uv;

var currentTime = moment().hour();
// console.log(currentTime);


let data = [];

getWeather();
function getWeather() {
var queryURL = `https://api.openweathermap.org/data/2.5/weather?appid={apiKey}&units=imperial`;
//imperial for fahrenheit(still doesn't work)


$.ajax({
  type: 'GET',
  url: queryURL,

  success: function(data) {
    console.log('success');
  }
});

}






// eventListeners-----
// $('searchBtn').on('click', getWeather);