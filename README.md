# weatherForecastSite
this is a weather forecast sight where you can put any information you want to and then you can get live information as well as a 5 day forecast of your selected area
the app works for any place no matter how remote, even census designated areas will put out a lattitude and longitude and give you your forecast

## how it works
this application works by taking the town or city name you put into a search box and putting it through the GeoCoder api
the Geocoder will run the given information against its database and output the coordinates of whatever town you give it 
once the coordinates have been obtained it will send it through the main OpenWeatherMap Api
the weather map will then output an object containing 40 arrays that all have meteorlogical information for 5 days in 3 hour intervals 
the Dates for the forecast are also pulled from DayJs and the text inputs are also saved into an array in local storage to be displayed under the search box
The Website will then sift through the arrays and pull out all the information it needs like weather temperature wind speed and humidity
Temperature wind and humidity will be pulled from 5 of the arrays and be put into the dom along with the Dates
the weather information is given in codes that have to be filtered into their correct icon and then put into the dom

## Challenges
A massive challenge i ran into while coding this website was code its self, i had initially tried to use for loops to get most of the functions done relatively quickly
but using for loops weirdly enough slowed down the website a considerable amount so i ended up just hard coding it so every element has its own function 
which was a pain but the website runs a lot smoother. 

another challenge was getting the function that changes the weather id into an icon to work. the amount of if else functions that went into it made it super touchy and the syntax had to be changed a couple of times

looking back i realised i could have made a few things easier on myself, for example i added dayJS into the code before realising that the openweather map provided me with all the required dates inside of the arrays.
also hard coding everything was probably the right answer due to how slow it was being with for loops but i feel like it made it a bit harder on me

## How to use

the website is super intuitive, on first use youll be provided with a couple of empty boxes and all you have to do is put whatever town or city you want into the search box and then search 
the website will then quickly fill out all of the boxes and then put your search into a history box that you can use to look at that places weather again
you can hold up to 4 items in your history.
after your first time using the website you when opened it will automatically fill in all the information from your previous search and keep your history
