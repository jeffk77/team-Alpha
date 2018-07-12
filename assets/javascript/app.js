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

var clean = {
    cafe: {
        0: { name: "Café Pamenar", hours: "8:00pm-2:30pm", reviews: "4.4/5", image: "https://via.placeholder.com/150x150", coordinates: {lat: 43.656668, lng: -79.402650} },
        1: { name: "Creeds", hours: "8:00pm-2:30pm", reviews: "4.4/5", image: "https://via.placeholder.com/150x150", coordinates: {lat: 43.674326, lng: -79.410960} },
        2: { name: "Quantum Coffee", hours: "8:00pm-2:30pm", reviews: "4.3/5", image: "https://via.placeholder.com/150x150", coordinates: {lat: 43.645567, lng: -79.395415} }
    },
    movie: {
        0: { name: "Scotiabank Theatre", hours: "8:00pm-2:30pm", reviews: "4.3/5", image: "https://via.placeholder.com/150x150", coordinates: {lat: 43.648925, lng: -79.391233} },
        1: { name: "Hot Docs Ted Rogers Cinema", hours: "8:00pm-2:30pm", reviews: "4.6/5", image: "https://via.placeholder.com/150x150", coordinates: {lat: 43.665571, lng: -79.410474} },
        2: { name: "TIFF Bell Lightbox", hours: "8:00pm-2:30pm", reviews: "4.3/5", image: "https://via.placeholder.com/150x150", coordinates: {lat: 43.645567, lng: -79.395415} }
    }
}

for (i = 0; i < Object.keys(grungy).length; i++) {
    let count = i.toString();
    let choice = grungy[count];
    let selection = $(`<div class="selection" style="clear:both; padding-bottom: 10px">`);
    let name = $(`<h4 class="name">`).html(choice.name);
    let hours = $(`<p class="hours">`).html(choice.hours);
    let reviews = $(`<p class="reviews">`).html(choice.reviews);
    let image = $(`<img src="${choice.image}" style="float: left">`);
    $(selection).append(image, name, hours, reviews);
    console.log(selection);
    $("#grungy-bars-list").append(selection);
}

//Creating choice selection depending on the section
$("#grungy-bars").on("click", function () {
    for (i = 0; i < places.length; i++) {
        let selection = $(`<li class="selection" value="${grungy - bars[i]}"`);
        selection.append(grungy[i].name);
        selection.append(grungy[i].hours);
        selection.append(grungy[i].reviews);
        selection.append(grungy[i].image);
        $("#grungy-bars").prepend(selection);
    }
});

//Google Maps
//Changes the Google Map and marker to the new location
$(".selection").on("click", function () {
    lcn = places[$(this).val()];
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
};