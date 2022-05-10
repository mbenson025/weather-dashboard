//document ready function
$(document).ready(function() {

//global variables
var cityWeather;
var recentHistory;
var lat;
var lon;
var temp;
var wind;
var humidity;
var uv;

// var testCity = Chicago;

var currentTime = moment().hour();
// console.log(currentTime);


let data = [];



  $('#searchWeather').click(function(){

    var apiKey = 'b6a631faf48ec36736fa91299da2f0a2';

    //take input value from search field
    var city = $('#city').val();

    //check for empty field
    if (city != '') {


        $.ajax({

          type: "GET",
          // url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=b6a631faf48ec36736fa91299da2f0a2",
          url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`,
          id: "city",
          success: function(data) {
            console.log(data);
            

            var weatherArray = reveal(data);
            $('#reveal').text(weatherArray);
            console.log(data);

            var dailyTemp = dailyConditions.append(`Temperature: ${data.main.temp}`)
            var dailyWind = dailyConditions.append(`Wind: ${data.wind.speed}`)
            var dailyHumid = dailyConditions.append(`Humidity: ${data.main.humidity}`)


            
          }
      });

    } else {
      $('#inputError').text('Please enter a city name');
    }
  });


function reveal(data) {
  return
}


});
//close ready function