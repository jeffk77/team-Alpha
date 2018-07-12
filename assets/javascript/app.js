//API key for weather
var APIKey = "&APPID=4041ca2a75ad9d5eb8e0379aea113e09"

var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
"q=Toronto,Canada&units=imperial&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response) {
        console.log(queryURL);
        console.log(response);


    })