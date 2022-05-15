$(document).ready(function() {
    $('#five-day-forecast').hide();
    $('#daily-forecast').hide();

    var cityHistory = JSON.parse(localStorage.getItem('historyKey')) || [];

    if (cityHistory !== null) {
        
        cityHistory.forEach(function(cityHistory){
        $('.recentHistory').append($(`<button id="recBtn" class= "recBtn list-group-item list-group-item-action">${cityHistory}</button>`));
      });
    }

});


var cityHistory = [];
  

  function searchWeather(city) {
    var apiKey = 'b6a631faf48ec36736fa91299da2f0a2';
    
    
    var cityHistory = JSON.parse(localStorage.getItem('historyKey')) || [];
    
    //take input, trim spaces and convert to lowercase
    

    // capitalize each first letter
    function capitalize(city) {
    const words = city.split(' ');
    const output = words.map(word => {
    const firstLetter = word.substring(0, 1).toUpperCase();
    const rest = word.substring(1);  

    return `${firstLetter}${rest}`
    });
    return output.join(' ')
    }

    var cityInput = capitalize(city);
    
    //clear previous search
    $("#dailyConditions").empty();
    $(".forecastRow").empty();
    
    //check for empty field
    if (cityInput != '') {
      //check for duplicate search before putting into array
      if (!cityHistory.includes(cityInput)){
        cityHistory.push(cityInput);
        var cityList = $(`<button class="recBtn list-group-item list-group-item-action">${cityInput}</button>`);
        // console.log(cityList);
        $('.recentHistory').append(cityList);
      }
        localStorage.setItem('historyKey', JSON.stringify(cityHistory));
        // console.log(cityHistory.length);

        $('#daily-forecast').show();

        $.ajax({

          type: "GET",
          url: `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&APPID=${apiKey}`,
          id: "city",
          success: function(data) {
            
            // console.log(data);
            var uvLat = data.coord.lat;
            var uvLon = data.coord.lon;
            var date = new Date(data.dt * 1000).toLocaleDateString('en-US');
            var icon = data.weather[0].icon
            
            var dailyTitle = (`${cityInput} ${date}`)
            var dailyTemp = (`Temperature: ${data.main.temp} °F`);
            var dailyWind = (`Wind Speed: ${data.wind.speed} MPH`);
            var dailyHumid = (`Humidity: ${data.main.humidity}%`);

            
            $('#dailyTitle').html(`${dailyTitle} <img src="https://openweathermap.org/img/wn/${icon}.png"/>`)
            $('#dailyConditions').append($(`<li>${dailyTemp}</li>`));
            $('#dailyConditions').append($(`<li>${dailyWind}</li>`));
            $('#dailyConditions').append($(`<li>${dailyHumid}</li>`));

            $('#five-day-forecast').show();

            $.ajax({

              type: "GET",
              url: `https://api.openweathermap.org/data/2.5/onecall?lat=${uvLat}&lon=${uvLon}&exclude={part}&appid=${apiKey}`,
              id: "city",
              success: function(data) {
                // console.log(data);
                var propUV = `${data.current.uvi}`;
                $('#dailyConditions').append(`<li>UV Index: <span id="uvColor">${propUV}</span></li>`);
                // console.log(propUV);

                //openweather links to wiki with 0-2 green(low), 3-5 yellow(moderate), 6-7 orange(high), 8-10 red(very high), 11+ violet(extreme)
                if (propUV <= 3) {
                  $('#uvColor').css('background-color', '#008F39').attr('class', 'badge');
                }
                else if (propUV <= 5) {
                  $('#uvColor').css('background-color', '#FEC901').attr('class', 'badge');
                }
                else if (propUV <= 7) {
                  $('#uvColor').css('background-color', '#e36530').attr('class', 'badge');
                }
                else if (propUV <= 10) {
                  $('#uvColor').css('background-color', '#cc3129').attr('class', 'badge');
                }
                else {
                  $('#uvColor').css('background-color', '#a76ebb').attr('class', 'badge');
                }
                
                fiveCast(uvLat,uvLon);
              }
            });
          }
      });

          function fiveCast () {
          //5 DAYS
          $.ajax({

            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=imperial&APPID=${apiKey}`,
            id: "city",
            
          }).then(function (data) {
           // console.log(data.list);
            // console.log(data.list[0]);
            // console.log(data.list[0].dt);
            // console.log(data.list[0].main.temp);

            for (i=7; i<42; i+=7) {
              var forecastCard = $('<div class = "card col">');
              var forecastTitle = $('<p class = "castDate">');
              var forecastTemp = $('<p class = "temp">');
              var forecastWind = $('<p class = "wind">');
              var forecastHumidity = $('<p class = "humid">');
              
              var compTime = data.list[i].dt;
              var humanTime = compTime *= 1000;
              var date = new Date(humanTime);
              // console.log(date);

              var currentTime = moment(date).format('MM/DD/YYYY');

              iconData = (`<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png"/>`);
              forecastTitle.html(`${currentTime} ${iconData}`);
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
      $('#inputError').text('Please enter a city');
    }
  };



$('#submitBtn').click(function(){
  var cityInputField = $('#cityInput').val().trim().toLowerCase();
    searchWeather(cityInputField);
});

  //search with enter key
$('#cityInput').keypress(function(e){
  if(e.which === 13) {
    var cityInputEnter = $('#cityInput').val().trim().toLowerCase();
    searchWeather(cityInputEnter);
  }
});


$('#recentHistory').on('click',(e) =>{
  var element = e.target;
  console.log(element);
  var elementHistory = $(element).html();
  
  searchWeather(elementHistory);
});
