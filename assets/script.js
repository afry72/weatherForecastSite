//function begins when the page is loaded, this allows the page to pull data from local storage and have information already brought up whenever you access the page
$(document).ready(function() {
    //the search button will pull data from the input box and input it into storage before sending it into the function
    $(".searchBtn").on("click",function(event) {
        event.preventDefault();
        console.log("button pressed");
        
        var searchQuery = $('#location').val();
        console.log(searchQuery);
        
        //save to local storage

        var searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

        if (searchHistory.length >= 4) {
          searchHistory.shift();
        };

        searchHistory.push(searchQuery);

        localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
        
        $('#historyBox4').text(searchHistory[0]);
        $('#historyBox3').text(searchHistory[1]);
        $('#historyBox2').text(searchHistory[2]);
        $('#historyBox1').text(searchHistory[3]);

        console.log(searchHistory[0]);
        console.log(searchHistory[1]);
        console.log(searchHistory[2]);
        console.log(searchHistory[3]);


        fetchWeather(searchQuery);
    });

    //this function pulls the latest input from local storage and auto loads it when page is started
    //it also auto fills search history
    $(function() {
      console.log("function");
      var pulled = JSON.parse(localStorage.getItem('weatherHistory')) || [];
      var searchQuery = pulled[pulled.length - 1];
      console.log(searchQuery);

      $('#historyBox4').text(pulled[0]);
      $('#historyBox3').text(pulled[1]);
      $('#historyBox2').text(pulled[2]);
      $('#historyBox1').text(pulled[3]);

      fetchWeather(searchQuery);
    });

    //this allows locations to be selected from history instead of having to type it in again
    //these functions will also not create new searches and flood the search history with copies of the same place
    //like a handful of the functions in this site i hard coded it due to small amount of options
    $("#historyBox1").on("click",function(event) {
      event.preventDefault();
      console.log("hisbutton pressed");
      var searchQuery = $('#historyBox1').text();
      fetchWeather(searchQuery);
    });

    $("#historyBox2").on("click",function(event) {
      event.preventDefault();
      console.log("hisbutton pressed");
      var searchQuery = $('#historyBox2').text();
      fetchWeather(searchQuery);
    });

    $("#historyBox3").on("click",function(event) {
      event.preventDefault();
      console.log("hisbutton pressed");
      var searchQuery = $('#historyBox3').text();
      fetchWeather(searchQuery);
    });

    $("#historyBox4").on("click",function(event) {
      event.preventDefault();
      console.log("hisbutton pressed");
      var searchQuery = $('#historyBox4').text();
      fetchWeather(searchQuery);
    });

    //this is the main function of the website, this function pulls geo data from the geocoder api and then inputs it into the openweathermap api
    //a large chunk of this function is also hard coded but not just for ease of coding but its also way more stable puts way less strain on the browser
    function fetchWeather (searchQuery) {
        console.log(searchQuery);
      
        if (searchQuery) {
            // getting location from parameters through geocoder api
          locFetch = 'https://api.openweathermap.org/geo/1.0/direct?q='+searchQuery+'&limit=1&appid=21e1eb8bb7f77cea96ca6673d97cf6cb';
            
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
      
            console.log(locRes);
            
            var lat = locRes[0].lat;

            var lon = locRes[0].lon;

            console.log(lat);
            console.log(lon);
            //this takes the information from the geocoder and puts it through the actual openweather map so it can output the weather data
        
            console.log("test");
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

            //dayjs set up so i can provide dates on the 5 day forecast
            var dateDay1 = dayjs().format('D-M-YY');
        
            var dateDay2 = dayjs().add(1, 'day').format('D-M-YY');

            var dateDay3 = dayjs().add(2, 'day').format('D-M-YY');

            var dateDay4 = dayjs().add(3, 'day').format('D-M-YY');

            var dateDay5 = dayjs().add(4, 'day').format('D-M-YY');
            

            console.log(dateDay1);


            //weather for today, these vars dig through the location provided by openweathermaps to pull out the required information
            //the data is provided within 40 different arrays seperated by 3 hours per data set 
            //these vars take individual data from individual days and output them into the remaining 2 parts of the function

            var temperature = locRes.list[0].main.temp;
            console.log (temperature);

            var wind = locRes.list[0].wind.speed;
            console.log(wind);

            var humidity = locRes.list[0].main.humidity;
            console.log(humidity);

            var weather = locRes.list[0].weather[0].id;
            console.log(weather);


            //day 2 weather
            var temperature2 = locRes.list[8].main.temp;

            var wind2 = locRes.list[8].wind.speed;

            var humidity2 = locRes.list[8].main.humidity;

            var weather2 = locRes.list[8].weather[0].id;

            //day 3 weather
            var temperature3 = locRes.list[16].main.temp;

            var wind3 = locRes.list[16].wind.speed;

            var humidity3 = locRes.list[16].main.humidity;

            var weather3 = locRes.list[16].weather[0].id;

            //day 4 weather
            var temperature4 = locRes.list[24].main.temp;

            var wind4 = locRes.list[24].wind.speed;

            var humidity4 = locRes.list[24].main.humidity;

            var weather4 = locRes.list[24].weather[0].id;

            //day 5 weather
            var temperature5 = locRes.list[32].main.temp;

            var wind5 = locRes.list[32].wind.speed;

            var humidity5 = locRes.list[32].main.humidity;

            var weather5 = locRes.list[32].weather[0].id;

            //setting up emojis
            //the main weather data provided by openweather api is seperated into 7 categories with individual codes, for example intense rain would be id'd as 503
            //this can be simplified by its general category and then output as a emoji
            //this part of the function takes the id number and checks to see which category its in and outputs the corresponding icon
            
            //Day 1
            if (weather >= 200 && weather < 300) {
              var weatherEmoji = "⛈️";

            } else if (weather >= 300 && weather < 400) {
              var weatherEmoji = "🌧️";

            } else if (weather >= 500 && weather < 600) {
              var weatherEmoji = "🌧️";

            } else if (weather >= 600 && weather < 700) {
              var weatherEmoji = "🌨️";

            } else if (weather >= 700 && weather < 800) {
              var weatherEmoji = "🌫️";

            } else if (weather == 800) {
              var weatherEmoji = "☀️";

            } else if (weather >= 800 && weather < 805) {
              var weatherEmoji = "🌤️";
            };

            //day 2
            if (weather2 >= 200 && weather2 < 300) {
              var weatherEmoji2 = "⛈️";

            } else if (weather2 >= 300 && weather2 < 400) {
              var weatherEmoji2 = "🌧️";

            } else if (weather2 >= 500 && weather2 < 600) {
              var weatherEmoji2 = "🌧️";

            } else if (weather2 >= 600 && weather2 < 700) {
              var weatherEmoji2 = "🌨️";

            } else if (weather2 >= 700 && weather2 < 800) {
              var weatherEmoji2 = "🌫️";

            } else if (weather2 == 800) {
              var weatherEmoji2 = "☀️";

            } else if (weather2 >= 800 && weather2 < 805) {
              var weatherEmoji2 = "🌤️";
            };

            //day 3
            if (weather3 >= 200 && weather3 < 300) {
              var weatherEmoji3 = "⛈️";

            } else if (weather3 >= 300 && weather3 < 400) {
              var weatherEmoji3 = "🌧️";

            } else if (weather3 >= 500 && weather3 < 600) {
              var weatherEmoji3 = "🌧️";

            } else if (weather3 >= 600 && weather3 < 700) {
              var weatherEmoji3 = "🌨️";

            } else if (weather3 >= 700 && weather3 < 800) {
              var weatherEmoji3 = "🌫️";

            } else if (weather3 == 800) {
              var weatherEmoji3 = "☀️";

            } else if (weather3 >= 800 && weather3 < 805) {
              var weatherEmoji3 = "🌤️";
            };

            //day 4
            if (weather4 >= 200 && weather4 < 300) {
              var weatherEmoji4 = "⛈️";

            } else if (weather4 >= 300 && weather4 < 400) {
              var weatherEmoji4 = "🌧️";

            } else if (weather4 >= 500 && weather4 < 600) {
              var weatherEmoji4 = "🌧️";

            } else if (weather4 >= 600 && weather4 < 700) {
              var weatherEmoji4 = "🌨️";

            } else if (weather4 >= 700 && weather4 < 800) {
              var weatherEmoji4 = "🌫️";

            } else if (weather4 == 800) {
              var weatherEmoji4 = "☀️";

            } else if (weather4 >= 800 && weather4 < 805) {
              var weatherEmoji4 = "🌤️";
            };

            //day 5
            if (weather5 >= 200 && weather5 < 300) {
              var weatherEmoji5 = "⛈️";

            } else if (weather5 >= 300 && weather5 < 400) {
              var weatherEmoji5 = "🌧️";

            } else if (weather5 >= 500 && weather5 < 600) {
              var weatherEmoji5 = "🌧️";

            } else if (weather5 >= 600 && weather5 < 700) {
              var weatherEmoji5 = "🌨️";

            } else if (weather5 >= 700 && weather5 < 800) {
              var weatherEmoji5 = "🌫️";

            } else if (weather5 == 800) {
              var weatherEmoji5 = "☀️";

            } else if (weather5 >= 800 && weather5 < 805) {
              var weatherEmoji5 = "🌤️";
            };


            console.log(weatherEmoji);
            console.log(weatherEmoji2);
            console.log(weatherEmoji3);
            console.log(weatherEmoji4);
            console.log(weatherEmoji5);

            //modifying elements to add in all information
            //this consolodates all of the information gathered thus far and inputs it into text areas in the dom

            //big box for today

            $('#selectedLocation').text(searchQuery);
            $('#weatherEmote').text(weatherEmoji);
            $('#tempVar').text(temperature);
            $('#windVar').text(wind);
            $('#humVar').text(humidity);

            // small box for today

            $('#dateBox1').text(dateDay1);
            $('#weatherEmote1').text(weatherEmoji);
            $('#tempVar1').text(temperature);
            $('#windVar1').text(wind);
            $('#humVar1').text(humidity);

            // day 2

            $('#dateBox2').text(dateDay2);
            $('#weatherEmote2').text(weatherEmoji2);
            $('#tempVar2').text(temperature2);
            $('#windVar2').text(wind2);
            $('#humVar2').text(humidity2);

            // day 3

            $('#dateBox3').text(dateDay3);
            $('#weatherEmote3').text(weatherEmoji3);
            $('#tempVar3').text(temperature3);
            $('#windVar3').text(wind3);
            $('#humVar3').text(humidity3);

            // day 4

            $('#dateBox4').text(dateDay4);
            $('#weatherEmote4').text(weatherEmoji4);
            $('#tempVar4').text(temperature4);
            $('#windVar4').text(wind4);
            $('#humVar4').text(humidity4);

            // day 5

            $('#dateBox5').text(dateDay5);
            $('#weatherEmote5').text(weatherEmoji5);
            $('#tempVar5').text(temperature5);
            $('#windVar5').text(wind5);
            $('#humVar5').text(humidity5);
            
            })
        });
    };
  
});


