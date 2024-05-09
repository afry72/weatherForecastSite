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

            //dayjs set up
            var dateDay1 = dayjs().format('D-M-YY');
        
            var dateDay2 = dayjs().add(1, 'day').format('D-M-YY');

            var dateDay3 = dayjs().add(2, 'day').format('D-M-YY');

            var dateDay4 = dayjs().add(3, 'day').format('D-M-YY');

            var dateDay5 = dayjs().add(4, 'day').format('D-M-YY');
            

            console.log(dateDay1);


            //weather for today

            var temperature = locRes.list[0].main.temp;
            console.log (temperature);

            var wind = locRes.list[0].wind.speed;
            console.log(wind);

            var humidity = locRes.list[0].main.humidity;
            console.log(humidity);

            var weather = locRes.list[0].weather[0].main;
            console.log(weather);


            //day 2 weather
            var temperature2 = locRes.list[0+8].main.temp;

            var wind2 = locRes.list[0+8].wind.speed;

            var humidity2 = locRes.list[0+8].main.humidity;

            var weather2 = locRes.list[0+8].weather[0].main;

            //day 3 weather
            var temperature3 = locRes.list[0+16].main.temp;

            var wind3 = locRes.list[0+16].wind.speed;

            var humidity3 = locRes.list[0+16].main.humidity;

            var weather3 = locRes.list[0+16].weather[0].main;

            //day 4 weather
            var temperature4 = locRes.list[0+24].main.temp;

            var wind4 = locRes.list[0+24].wind.speed;

            var humidity4 = locRes.list[0+24].main.humidity;

            var weather4 = locRes.list[0+24].weather[0].main;

            //day 5 weather
            var temperature5 = locRes.list[0+32].main.temp;

            var wind5 = locRes.list[0+32].wind.speed;

            var humidity5 = locRes.list[0+32].main.humidity;

            var weather5 = locRes.list[0+32].weather[0].main;

            //setting up emojis
            
            var emojiList = {
              "clear sky": "☀️",
              "few clouds": "🌤️",
              "scattered clouds": "🌤️",
              "broken clouds": "🌤️",
              "shower rain": "🌧️",
              "rain": "🌧️",
              "thunderstorm": "⛈️",
              "snow": "🌨️",
              "mist": "🌫️",
            };

            if (weather in emojiList) {
              return emojiList[weather];
            };

            var weatherEmoji = weather.emojiList;
            //modifying elements to add in all information

            //big box for today

            $('#selectedLocation').text(searchQuery);
            $('#weatherEmote1').text(weatherEmoji);
            $('#tempVar').text(temperature);
            $('#windVar').text(wind);
            $('#humVar').text(humidity);

            // small box for today

            $('#dateBox1').text(dateDay1);
            //$('#').text();
            $('#tempVar1').text(temperature);
            $('#windVar1').text(wind);
            $('#humVar1').text(humidity);

            // day 2

            $('#dateBox2').text(dateDay2);
            //$('#').text();
            $('#tempVar2').text(temperature2);
            $('#windVar2').text(wind2);
            $('#humVar2').text(humidity2);

            // day 3

            $('#dateBox3').text(dateDay3);
            //$('#').text();
            $('#tempVar3').text(temperature3);
            $('#windVar3').text(wind3);
            $('#humVar3').text(humidity3);

            // day 4

            $('#dateBox4').text(dateDay4);
            //$('#').text();
            $('#tempVar4').text(temperature4);
            $('#windVar4').text(wind4);
            $('#humVar4').text(humidity4);

            // day 5

            $('#dateBox5').text(dateDay5);
            //$('#').text();
            $('#tempVar5').text(temperature5);
            $('#windVar5').text(wind5);
            $('#humVar5').text(humidity5);
            
            })
        });
    };
});


