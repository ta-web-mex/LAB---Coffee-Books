mapboxgl.accessToken =
  'pk.eyJ1Ijoia2V2aW5nbWNjIiwiYSI6ImNrOWF0cGd4ZDI2eWgzaW15bGw0dzQzYmYifQ.MOJsQX40KvFSCrvwSBHbaA'
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 13,
})

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  })
)

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
    const currentPosition = [longitude, latitude]
    map.setCenter(currentPosition)
  })
}

const $geocoder = document.querySelector('.mapboxgl-ctrl-geocoder--input')

$geocoder.onchange = addCoordsToForm

function addCoordsToForm() {
  // necesitamos obtener las coordenadas del centro del mapa actualmente
  const { lng, lat } = map.getCenter()
  //taemos los inputs de html al mundo de js mediante la api  del DOM
  const $lng = document.getElementById('longitud')
  const $lat = document.getElementById('latitud')
  const $name = document.getElementById('name')
  const $button = document.querySelector('#submit')
  // asignamos a la propiedad value los elementos de las coordenadas y del name que viene del valor del geocoder
  $lng.value = lng
  $lat.value = lat
  $name.value = $geocoder.value.split(',')[0]
  $button.removeAttribute('disabled')
}
