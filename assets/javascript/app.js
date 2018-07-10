var places = {
    toronto: {lat: 43.653908, lng: -79.384293},
    oise: {lat: 43.668117, lng: -79.398363},
    eatonCenter: {lat: 43.654828, lng: -79.380703},
    harbourfrontCenter: {lat: 43.638927, lng: -79.381906}
};

var map;

// var location = {lat: 43.653908, lng: -79.384293};

$(".btn").on("click", function places() {
    let location = $(this).val();
    console.log(location);
    initMap();
});


//Google Maps
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.653908, lng: -79.384293},
        zoom: 13
    });
    // let marker = new google.maps.Marker({position: location, map: map})
};