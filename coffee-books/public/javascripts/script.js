mapboxgl.accessToken = 'pk.eyJ1IjoiZWdpb3JnYW5hIiwiYSI6ImNrNjgyb3J3dzAwbnAzbnFibHh0amthaG4ifQ.80NrLfbnQvB6S3sl6F7KoA';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
  });

const geoCoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  countries: 'mx'
})

map.addControl(geoCoder)

map.on('moveend', r => {
const { lng, lat } = map.getCenter()
if (lng !== 0 || lat !== 0) {
  new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map)
  const address = document.querySelector('input[placeholder="Search"]').value
  const addressInput = document.querySelector('input[name="address"]')
  const latInput = document.querySelector('input[name="latitude"]')
  const lngInput = document.querySelector('input[name="longitude"]')
  latInput.value = lat
  lngInput.value = lng
  addressInput.value = address
}
})



  

