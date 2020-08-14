let map = L.map("map").setView([28.593218, 77.247364], 13);

// add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// debugger;
let pointsgroup = L.featureGroup();
pointsJson.forEach(point => {
    console.log(L.marker(point));
    pointsgroup.addLayer(L.marker(point));
    console.log(pointsgroup);
})
pointsgroup.addTo(map)

// let trip = L.geoJSON();
$.get(`https://router.project-osrm.org/trip/v1/driving/${pointsJson[0][1]},${pointsJson[0][0]};${pointsJson[1][1]},${pointsJson[1][0]};${pointsJson[2][1]},${pointsJson[2][0]};${pointsJson[3][1]},${pointsJson[3][0]}?steps=true&geometries=geojson&overview=full&annotations=true`, function(data) {
    console.log(data);
    trip = L.polyline(L.GeoJSON.coordsToLatLngs(data.trips[0].geometry.coordinates), { color: 'red' }).addTo(map);
    map.fitBounds(trip.getBounds());
});