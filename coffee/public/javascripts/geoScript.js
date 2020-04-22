mapboxgl.accessToken =
  'pk.eyJ1IjoicGFraWxsb2VwIiwiYSI6ImNrOWF2YmtmNDI3cXgzaG1zeHFheGwwamMifQ.4Zcwn5wA8spNnbbmt-13ZA'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 12,
})

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
  })
)

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
    const userPosition = [longitude, latitude]
    map.setCenter(userPosition)
  })
}

const $geocoder = document.querySelector('.mapboxgl-ctrl-geocoder--input')

$geocoder.onchange = addCoordsToForm

function addCoordsToForm() {
  const { lng, lat } = map.getCenter()

  const $lng = document.getElementById('longitude')
  const $lat = document.getElementById('latitude')
  const $name = document.getElementById('name')
  const $button = document.querySelector('#submit')

  $lng.value = lng
  $lat.value = lat
  $name.value = $geocoder.value.split(',')[0]
  $button.removeAttribute('disabled')
}
