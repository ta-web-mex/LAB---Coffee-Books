//Mapbox
mapboxgl.accessToken =
  'pk.eyJ1Ijoic3BlY3QzciIsImEiOiJjazlhdDBlaGowNGJrM2VuMW5iams0cGwyIn0.FKAI1Rbut15SUaeGd8TqGw';
const  map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 12,
});

// Gecoder 
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
  })
);

// span map in user's area
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
    const userPosition = [longitude, latitude];
    map.setCenter(userPosition);
  });
}

// Save values from mapbox to DOM in order to send via post
const $geocoder = document.querySelector('.mapboxgl-ctrl-geocoder--input');

$geocoder.onchange = addCoordsToForm;

function addCoordsToForm() {
  const { lng, lat } = map.getCenter();
  const $lng = document.getElementById('longitude');
  const $lat = document.getElementById('latitude');
  const $name = document.getElementById('name');
  const $button = document.querySelector('#submit');
  $lng.value = lng;
  $lat.value = lat;
  $name.value = $geocoder.value.split(',')[0];
  $button.removeAttribute('disabled');
}
