
mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZXlnMDAwIiwiYSI6ImNrbGlpYTBpNzJzb3Uyb3M4eDd6bjljOGIifQ.8Iz6WakEKJ0LwiEYlz5p9A';




var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-16.28343672568356, 28.456046923017453],
    zoom: 15,
});

var mapPin = new mapboxgl.Marker()
    .setLngLat([-16.28343672568356, 28.456046923017453])
    .setPopup(new mapboxgl.Popup().setHTML("<h3>CIFP César Manrique!</h3>"))
    .addTo(map);

mapPin.togglePopup();

export function setMap(location, city) {

    mapPin.remove();

    map.flyTo({
        center: [
            location[1],
            location[0]
        ],
        essential: true
    });

    mapPin = new mapboxgl.Marker()
        .setLngLat([location[1], location[0]])
        .setPopup(new mapboxgl.Popup().setHTML("<h3>"+city+"</h3>"))
        .addTo(map);

    mapPin.togglePopup();

}