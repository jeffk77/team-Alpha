//Google Maps Variables
var places = {
    toronto: { lat: 43.653908, lng: -79.384293 },
    oise: { lat: 43.668117, lng: -79.398363 },
    eatonCenter: { lat: 43.654828, lng: -79.380703 },
    harbourfrontCenter: { lat: 43.638927, lng: -79.381906 }
};

var grungy = {
    bar244: { name: "bar244", hours: "8:00pm-2:30pm", reviews: "3.1/5", image: "https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.0-9/14184538_1394835640531005_3775698912336605768_n.jpg?_nc_fx=fyyz1-1&_nc_cat=0&oh=929be449c7011a400ea2e9ee56e1d66d&oe=5BEC78FA" }
}

var map,
    marker;

var lcn = { lat: 43.653908, lng: -79.384293 };

//Selections Variables
var grungy = {
    0: { name: "Bar244", hours: "8:00pm-2:30pm", reviews: "3.1/5", image: "https://via.placeholder.com/150x150" },
    1: { name: "3 Brewers", hours: "8:00pm-2:30pm", reviews: "3.1/5", image: "https://via.placeholder.com/150x150" },
    2: { name: "The Madison", hours: "8:00pm-2:30pm", reviews: "3.1/5", image: "https://via.placeholder.com/150x150" },
    3: { name: "The Fifth", hours: "8:00pm-2:30pm", reviews: "3.1/5", image: "https://via.placeholder.com/150x150" }
};

// var clean = {
//     cafe: {
//         0: { name: "Café Pamenar", hours: "8:00pm-2:30pm", reviews: "4.4/5", image: "https://via.placeholder.com/150x150", coordinates: { lat: 43.656668, lng: -79.402650 } },
//         1: { name: "Creeds", hours: "8:00pm-2:30pm", reviews: "4.4/5", image: "https://via.placeholder.com/150x150", coordinates: { lat: 43.674326, lng: -79.410960 } },
//         2: { name: "Quantum Coffee", hours: "8:00pm-2:30pm", reviews: "4.3/5", image: "https://via.placeholder.com/150x150", coordinates: { lat: 43.645567, lng: -79.395415 } }
//     },
//     movie: {
//         0: { name: "Scotiabank Theatre", hours: "8:00pm-2:30pm", reviews: "4.3/5", image: "https://via.placeholder.com/150x150", coordinates: { lat: 43.648925, lng: -79.391233 } },
//         1: { name: "Hot Docs Ted Rogers Cinema", hours: "8:00pm-2:30pm", reviews: "4.6/5", image: "https://via.placeholder.com/150x150", coordinates: { lat: 43.665571, lng: -79.410474 } },
//         2: { name: "TIFF Bell Lightbox", hours: "8:00pm-2:30pm", reviews: "4.3/5", image: "https://via.placeholder.com/150x150", coordinates: { lat: 43.645567, lng: -79.395415 } }
//     }
// }

var clean = {
    cafe: {
        0: { name: "Café Pamenar" },
        1: { name: "Creeds" },
        2: { name: "Quantum Coffee" },
    }
}

//Dynamically curating the list depending on the selection
// for (i = 0; i < Object.keys(grungy).length; i++) {
//     let count = i.toString();
//     let choice = grungy[count];
//     let selection = $(`<div class="selection" style="clear:both; padding-bottom: 10px">`);
//     let name = $(`<h4 class="name">`).html(choice.name);
//     let hours = $(`<p class="hours">`).html(choice.hours);
//     let reviews = $(`<p class="reviews">`).html(choice.reviews);
//     let image = $(`<img src="${choice.image}" style="float: left">`);
//     $(selection).append(image, name, hours, reviews);
//     console.log(selection);
//     $("#grungy-bars").append(selection);
// }

//Google Maps
//Changes the Google Map and marker to the new location
// $(".selection").on("click", function () {
//     lcn = places[$(this).val()];
//     console.log(lcn);
//     map.panTo(lcn);
//     marker.setPosition(lcn);
// });

//Google Maps - only initialized once
function initMap() {
    console.log("inside " + JSON.stringify(lcn));
    map = new google.maps.Map(document.getElementById('map'), {
        center: lcn,
        zoom: 14
    });
    marker = new google.maps.Marker({ position: lcn, map: map })

    var request = {
        query: 'Quantum Coffee',
        fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
    }
    
    service = new google.maps.places.PlacesService(map)
    service.findPlaceFromQuery(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            let i = 0
            let selection = $(`<div class="selection" style="clear:both; padding-bottom: 10px">`);
            console.log(results[i]);
            console.log(results[i].name);
            let name = $(`<h4 class="name">`).html(results[i].name);
            let hours = $(`<p class="hours">`).html(results[i].opening_hours.open_now);
            let reviews = $(`<p class="reviews">`).html(results[i].rating);
            // let image = $(`<img src="${results.candidates.photos.}" style="float: left">`);
            $(selection).append(name, hours, reviews);
            console.log(selection);
            $("#grungy-bars").append(selection);
        }
    };
};

    // googleSearch()
    // //API key for Google Searches
    // function googleSearch() {
    //     console.log("inside")
    //     for (i = 0; i < Object.keys(clean.cafe).length; i++) {
    //         console.log(Object.keys(clean.cafe).length);
    //         console.log(clean.cafe[i].name)
    //         let search = clean.cafe[i].name;
    //         let queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${search}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD9GkhwBYoEj-doKhJ91eWbaEFccC37p5E`;

    //         $.ajax({
    //             crossOrigin: true,
    //             url: queryURL,
    //             method: "GET",
    //             dataType: 'json',
    //             cache: false,
    //             success: function (response) {
    //                 alert(response);
    //             }
    //         }).then(function (snapshot) {
    //             let selection = $(`<div class="selection" style="clear:both; padding-bottom: 10px">`);
    //             console.log(snapshot.candidates);
    //             console.log(snapshot.candidates.name);
    //             let name = $(`<h4 class="name">`).html(snapshot.candidates.name);
    //             let hours = $(`<p class="hours">`).html(snapshot.candidates.opening_hours.open_now);
    //             let reviews = $(`<p class="reviews">`).html(snapshot.candidates.rating);
    //             // let image = $(`<img src="${snapshot.candidates.photos.}" style="float: left">`);
    //             $(selection).append(name, hours, reviews);
    //             console.log(selection);
    //             $("#grungy-bars").append(selection);
    //         })
    //     }
    // };

//API key for weather
// var APIKey = "&APPID=4041ca2a75ad9d5eb8e0379aea113e09"
// var lat
// var lon

// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//     "lat=" + lat + "&lon=" + lon + APIKey;

// $.ajax({
//     url: queryURL,
//     method: "GET"
// })
//     .then(function (response) {
//         console.log(queryURL);
//         console.log(response);

//         //Transfering content to HTML
//         $(".").html("<h1>" + response + "</h1>");
//         //Logging the data in the console
//         console.log
//     })
