document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

mapboxgl.accessToken = "pk.eyJ1IjoiZG9iZXJtYW43IiwiYSI6ImNraGI5czhhMTE2a20yc211ZHJqZW1wejgifQ.p09t9msRM9_VHDfIpGjK1w";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-99.1269,  19.4978], // starting position [lng, lat]
  zoom: 9 // starting zoom
});



const marker = new mapboxgl.Marker()
  .setLngLat([-99.1622182, 19.4211955])
  .addTo(map);
