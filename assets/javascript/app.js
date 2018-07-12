//API key for weather
var APIKey = "&APPID=4041ca2a75ad9d5eb8e0379aea113e09"
var lat
var lon 

var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
"lat=" + lat + "&lon=" + lon + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response) {
        console.log(queryURL);
        console.log(response);

        //Transfering content to HTML
        $(".").html("<h1>" + response + "</h1>");
        //Logging the data in the console
        console.log
    })