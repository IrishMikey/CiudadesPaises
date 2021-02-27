
mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZXlnMDAwIiwiYSI6ImNrbGlpYTBpNzJzb3Uyb3M4eDd6bjljOGIifQ.8Iz6WakEKJ0LwiEYlz5p9A';


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [ -16.667297099586918, 28.266339166914378],
    zoom: 9,
});

function getUserLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setUserLocation);

    } else {
        console.log("No has permitido el uso de tu locacion");
    }

}
function setUserLocation(position) {
    map.flyTo({
        center: [
            position.coords.longitude,
            position.coords.latitude
        ],
        zoom:10,
        essential: true
    });
}

getUserLocation();



export function setMap(location) {

    map.flyTo({
        center: [
            location[1],
            location[0]
        ],
        essential: true
    });

    var mapPin = new mapboxgl.Marker()
        .setLngLat([location[1], location[0]])
        .addTo(map)
}

