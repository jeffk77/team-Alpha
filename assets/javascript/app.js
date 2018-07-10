var places = {
    toronto: { lat: 43.653908, lng: -79.384293 },
    oise: { lat: 43.668117, lng: -79.398363 },
    eatonCenter: { lat: 43.654828, lng: -79.380703 },
    harbourfrontCenter: { lat: 43.638927, lng: -79.381906 }
};

var map,
    marker;

var lcn = { lat: 43.653908, lng: -79.384293 };

$(".btn").on("click", function () {
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