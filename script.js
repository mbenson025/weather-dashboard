//document ready function
$(document).ready(function() {

//global variables
var cityWeather;
var recentHistory;


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
          url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`,
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

            var dailyTemp = (`Temperature: ${data.main.temp} °F`);
            var dailyWind = (`Wind Speed: ${data.wind.speed} MPH`);
            var dailyHumid = (`Humidity: ${data.main.humidity}%`);

            $('#dailyConditions').append($(`<li>${dailyTemp}</li>`));
            $('#dailyConditions').append($(`<li>${dailyWind}</li>`));
            $('#dailyConditions').append($(`<li>${dailyHumid}</li>`));
            
            





            $.ajax({

              type: "GET",
              url: `https://api.openweathermap.org/data/2.5/onecall?lat=${uvLat}&lon=${uvLon}&exclude={part}&appid=${apiKey}`,
              id: "city",
              success: function(data) {
                
                var propUV = `${data.current.uvi}`;
                var strUV = (`UV Index: ${propUV}`);
                $('#dailyConditions').append(`<li>${strUV}</li>`);

                //openweather links to wiki with 0-2 green(low), 3-5 yellow(moderate), 6-7 orange(high), 8-10 red(very high), 11+ violet(extreme)
                // if (propUV <= 10) {
                  
                // }



                fiveCast(uvLat,uvLon);
              }
            });


            
          }
      });

          function fiveCast (uvLat,uvLon) {
          //5 DAYS
          $.ajax({

            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${apiKey}`,
            id: "city",
            
          }).then(function (data) {
            
            console.log(data.list);
            console.log(data.list[0]);
            console.log(data.list[0].dt);
            console.log(data.list[0].main.temp);
            //TOO EASY

            for (i=0; i<35; i+=7) {
              var forecastCard = $('<div class="card col">');
              var forecastTitle = $('<p class="castDate">');
              var forecastTemp = $('<p class="temp">');
              var forecastWind = $('<p class="wind">');
              var forecastHumidity = $('<p class="humid">');
              // var forecastUV = $(`<p class="castUV">`)

              var compTime = data.list[i].dt;
              var humanTime = compTime *= 1000;
              var date = new Date(humanTime);
              console.log(date);

              forecastTemp.text(`Temperature: ${data.list[i].main.temp}`);
              forecastWind.text(`Wind: ${data.list[i].wind.speed}`);
              forecastHumidity.text(`Humidity: ${data.list[i].main.humidity}`);
              

              $(`.forecastRow`).append(forecastCard);
              forecastCard.append(forecastTitle);
              forecastCard.append(forecastTemp);
              forecastCard.append(forecastWind);
              forecastCard.append(forecastHumidity);
            }
          });
        }

          
      
    } else {
      $('#inputError').text('Please enter a city name');
    }
  });


function reveal(data) {
  return
}


});
//close ready function