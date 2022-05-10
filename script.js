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

            var weatherArray = reveal(data);
            $('#reveal').text(weatherArray);
            console.log(data);
            // console.log(data.coord.lat);
            var uvLat = data.coord.lat;
            var uvLon = data.coord.lon;
            // console.log(uvLat);
            // console.log(uvLon);

            var dailyTemp = dailyConditions.append(`Temperature: ${data.main.temp}`)
            var dailyWind = dailyConditions.append(`Wind: ${data.wind.speed}`)
            var dailyHumid = dailyConditions.append(`Humidity: ${data.main.humidity}`)
            
            $.ajax({

              type: "GET",
              url: `https://api.openweathermap.org/data/2.5/onecall?lat=${uvLat}&lon=${uvLon}&exclude={part}&appid=${apiKey}`,
              id: "city",
              success: function(data) {
                
                var dailyUV = dailyConditions.append(`UV Index: ${data.current.uvi}`)
              }
            })


            
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