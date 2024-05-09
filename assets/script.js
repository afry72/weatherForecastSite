//create searchbox function and save the output data to local storage
$(document).ready(function() {
    $(".searchBtn").on("click",function(event) {
        event.preventDefault();
        console.log("button pressed");
        
        var searchQuery = $('#location').val();
        console.log(searchQuery);
        
        //save to local storage

        fetchWeather(searchQuery);
    });

    function fetchWeather (searchQuery) {
        console.log(searchQuery);
    
        if (searchQuery) {
            // getting location from parameters
          locFetch = 'http://api.openweathermap.org/geo/1.0/direct?q='+searchQuery+'&limit=1&appid=21e1eb8bb7f77cea96ca6673d97cf6cb';
            
        };
    
        console.log(searchQuery + "2");
      
        fetch(locFetch)
          .then(function (response) {
            if (!response.ok) {
              throw response.json();
            }
      
            return response.json();
          })
           .then(function (locRes) {
            // write query to page so user knows what they are viewing
            //resultTextEl.textContent = locRes.search.query; 
      
            console.log(locRes);
            
            var lat = locRes[0].lat;

            var lon = locRes[0].lon;

            console.log(lat);
            console.log(lon);
        
        if (lat && lon) {
            locFetch = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=21e1eb8bb7f77cea96ca6673d97cf6cb&units=imperial';
        };

        fetch(locFetch)
          .then(function (response) {
            if (!response.ok) {
              throw response.json();
            }
      
            return response.json();
          })
           .then(function (locRes) {
      
            console.log(locRes);
            //creating emojis for weather


            //weather for today

            var temperature = locRes.list[0].main.temp;
            console.log (temperature);

            var wind = locRes.list[0].wind.speed;
            console.log(wind);

            var humidity = locRes.list[0].main.humidity;
            console.log(humidity);

            var weather = locRes.list[0].weather[0].main;
            console.log(weather);

            $('#selectedLocation').text(searchQuery);
            //$('#').text();
            $('#tempVar').text(temperature);
            $('#windVar').text(wind);
            $('#humVar').text(humidity);

            //
            
            })
        });
    };
});


