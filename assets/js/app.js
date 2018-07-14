//Google Maps Variables
var places = {
    toronto: { lat: 43.653908, lng: -79.384293 },
    oise: { lat: 43.668117, lng: -79.398363 },
    eatonCenter: { lat: 43.654828, lng: -79.380703 },
    harbourfrontCenter: { lat: 43.638927, lng: -79.381906 }
};

var map,
    marker;

var lcn = { lat: 43.653908, lng: -79.384293 };

//Selections Variables
var clean = [
    cafe = ["Café Pamenar", "Creeds Coffee Bar", "Quantum Coffee"],
    dessert = ["Fuwa Fuwa", "Future Bistro", "Put A Cone On It"],
    movie = ["Scotiabank Theatre Toronto", "Hot Docs Ted Rogers Cinema", "TIFF Bell Lightbox"],
    shopping = ["Eaton Centre", "Yorkville Village", "Manulife Centre"]
];

var classy = [
    bar = ["Speakeasy 21", "King Taps", "Drake One Fifty"],
    boardGames = ["Snakes & Lattes", "401 Games", "Bampot Bohemian House"],
    restaurant = ["The Chase Fish and Oyster", "Estiatorio Volos", "Kasa Moto"],
    theatre = ["Tarragon", "Soulpepper", "CanStage"]
];

var buzzin = [
    comedyClub = ["Comedy Bar", "The Second City Theater Toronto", "Yuk Yuk’s Comedy Club Toronto"],
    escapeRooms = ["Mysterious Minds Escape Rooms", "Captive Escape Rooms Downtown Toronto", "Roundabout Canada"],
    pub = ["Real Sports Bar", "The Dock Ellis", "Hurricanes Roadhouse Restaurant"],
];

var trashed = [
    burlesqueClub = ["Painted Lady", "Revival", "Round Venue"],
    casino = ["Canadian National Exhibition", "Fallsview Casino", "Casino Rama"],
    club = ["Rebel Toronto", "El Convento Rico Nightclub", "The Fifth Social Club"],
    dragBar = ["Buddies in Bad Times", "Crews and Tangos", "Woody’s and Sailor"]
];

var fucked = [
    drugs = ["The Toronto Dispensary", "Cloud 6ix", "Zen Zoo"],
    shisha = ["Shisha&Co", "Ali Baba Café and Restaurant", "King Shisha Lounge"],
    stripClub = ["Brass Rail", "House of Lancaster Two", "Remingtons Men of Steel"],
    toyStore = ["Stag Shop", "Seduction", "Northbound Leather"]
];

//Google Maps
// Changes the Google Map and marker to the new location
$("#selection").on("click", ".selection", function () {
    lcn = JSON.parse($(this).attr("coordinates"));
    console.log(lcn);
    map.panTo(lcn);
    marker.setPosition(lcn);
});

//Google Maps - only initialized once
function initMap() {
    console.log("inside " + JSON.stringify(lcn));
    map = new google.maps.Map(document.getElementById('map'), {
        center: lcn,
        zoom: 14
    });
    marker = new google.maps.Marker({ position: lcn, map: map })

    for (var cat = 0; cat < Object.keys(fucked).length; cat++) {
        for (var count = 0; count < Object.keys(fucked[cat]).length; count++) {
            console.log(fucked[cat][count]);
            var request = {
                query: fucked[cat][count],
                fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
            }

            service = new google.maps.places.PlacesService(map)
            service.findPlaceFromQuery(request, callback);

            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    let selection = $(`<div class="selection" style="clear:both; padding-bottom: 10px">`);
                    console.log(results[0]);
                    let a = parseFloat(results[0].geometry.location.lat());
                    let b = parseFloat(results[0].geometry.location.lng());
                    let latlng = { lat: a, lng: b }
                    selection.attr("coordinates", JSON.stringify(latlng));
                    let name = $(`<h5 class="name">`).html(results[0].name);
                    if (!results[0].opening_hours) {
                        var hours = $(`<p class="hours">`).html(`No idea`)
                    } else if (results[0].opening_hours.open_now === true) {
                        var hours = $(`<p class="hours">`).html(`Everybody get in here!`)
                    } else {
                        var hours = $(`<p class="hours">`).html(`You missed out!`)
                    }
                    let reviews = $(`<p class="reviews">`).html(results[0].rating);
                    let image = $(`<img src="https://via.placeholder.com/100x100" style="float: left">`);
                    $(selection).append(image, name, hours, reviews);
                    $("#selection").append(selection);
                } else {
                    console.log("Error");
                }
            };
        };
    };
};

// //API key for weather
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

// // materialize code

// document.addEventListener('DOMContentLoaded', function () {
//     //var elems = document.querySelectorAll('.collapsible');
//     //var instances = M.Collapsible.init(elems, options);
//     var elem = document.querySelector('.collapsible');
//     var instance = M.Collapsible.init(elem, {
//         accordion: true
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems);
// });

// var options = {
//     swipeable: true,
// }

// var el = document.querySelector('.tabs');
// console.log(el);
// var instance = M.Tabs.init(el, options);
