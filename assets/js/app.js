// Setting up Firebase, and accepting name, age and filter choices.

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBk2Z_Okdf-285-eGYKl1ajGChrl29JwmI",
    authDomain: "sketchy-app-ab6a6.firebaseapp.com",
    databaseURL: "https://sketchy-app-ab6a6.firebaseio.com",
    projectId: "sketchy-app-ab6a6",
    storageBucket: "sketchy-app-ab6a6.appspot.com",
    messagingSenderId: "735630482621"
};

firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {
    $('#modal').modal();
    $('#modal').modal('open');
});

// Function to accept new user entries, into input variables. Accepting values on "click".
$("#adduser").on("click", function (event) {
    event.preventDefault();

    var userName = $("#name-input").val().trim();
    var userAge = $("#age-input").val().trim();

    var newUser = {
        name: userName,
        age: userAge,
    };

    // Pushing values to Firebase.
    database.ref().push(newUser);

    $("#name-input").val("");
    $("#age-input").val("");
});

//Google Maps Variables
var map,
    marker;

var lcn = {
    lat: 43.653908,
    lng: -79.384293
};

//Selections Variables
var sections = ["", "", "", "#test-swipe-1", "#test-swipe-1", "#test-swipe-1", "#test-swipe-2", "#test-swipe-2", "#test-swipe-2", "#test-swipe-3", "#test-swipe-3", "#test-swipe-3", "#test-swipe-4", "#test-swipe-4", "#test-swipe-4"];

var selection = "";

var choices = {
    clean: ["cafe", "desert", "movie", "shopping"],
    classy: ["bar", "board games", "restaurant", "theatre"],
    buzzin: ["comedy club", "escape rooms", "pub"],
    trashed: ["burlesque club", "casino", "club", "drag bar"]
};

var clean = [
    cafe = ["Café Pamenar", "Creeds Coffee Bar", "Quantum Coffee"],
    dessert = ["Fuwa Fuwa", "Future Bistro", "Put A Cone On It"],
    movie = ["Scotiabank Theatre Toronto", "Hot Docs Ted Rogers Cinema", "TIFF Bell Lightbox"],
    shopping = ["Eaton Centre", "Yorkdale Shopping Centre", "Fairview Mall"]
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

//Obtaining selection
$("a").on("click", function () {
    return selection = $(this).attr("value")
});

function contentHeader() {
    $("#swipe-1").html(choices[selection][0]);
    $("#swipe-2").html(choices[selection][1]);
    $("#swipe-3").html(choices[selection][2]);
    $("#swipe-4").html(choices[selection][3]);
    console.log("inside");
};

//Google Maps Marker
// Changes the Google Map and marker to the new location
$(".nav-content").on("click", ".selection", function () {
    lcn = JSON.parse($(this).attr("coordinates"));
    console.log(lcn);
    map.panTo(lcn);
    marker.setPosition(lcn);
});

//Google Maps
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: lcn,
        zoom: 14
    });
    marker = new google.maps.Marker({ position: lcn, map: map })

    //Dynamically populating the category sections depending on user selection
    for (var cat = 0; cat < Object.keys(clean).length; cat++) {
        for (var count = 0; count < Object.keys(clean[cat]).length; count++) {
            var next = 0;
            var request = {
                query: clean[cat][count],
                fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry']
            }

            service = new google.maps.places.PlacesService(map)
            service.findPlaceFromQuery(request, callback);

            function callback(results, status) {
                next++;
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    let selection = $(`<div class="selection" style="clear:both; padding-bottom: 10px">`);
                    console.log(results[0]);
                    //Obtaining the location coordinates of the place
                    let a = parseFloat(results[0].geometry.location.lat());
                    let b = parseFloat(results[0].geometry.location.lng());
                    let latlng = { lat: a, lng: b }
                    selection.attr("coordinates", JSON.stringify(latlng));
                    let name = $(`<h5 class="name">`).html(results[0].name);
                    //Comparing if location is open or not
                    if (!results[0].opening_hours) {
                        var hours = $(`<p class="hours">`).html(`No idea`)
                    } else if (results[0].opening_hours.open_now === true) {
                        var hours = $(`<p class="hours">`).html(`Everybody get in here!`)
                    } else {
                        var hours = $(`<p class="hours">`).html(`You missed out!`)
                    }
                    let reviews = $(`<p class="reviews">`).html(results[0].rating + "/5");
                    let image = $(`<img src="https://via.placeholder.com/100x100" style="float: left">`);
                    $(selection).append(image, name, hours, reviews);
                    $(sections[next]).append(selection);

                } else {
                    console.log(google.maps.places);
                    console.log("Error");
                }
            }
        };
    };
};

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
    .then(function (response) {
        console.log(queryURL);
        console.log(response);

        //Transfering content to HTML
        $(".").html("<h1>" + response + "</h1>");
        //Logging the data in the console
        console.log
    })

// materialize code

document.addEventListener('DOMContentLoaded', function () {
    //var elems = document.querySelectorAll('.collapsible');
    //var instances = M.Collapsible.init(elems, options);
    var elem = document.querySelector('.collapsible');
    var instance = M.Collapsible.init(elem, {
        accordion: true
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

var options = {
    swipeable: true,
}

var el = document.querySelector('.tabs');
console.log(el);
var instance = M.Tabs.init(el, options);
