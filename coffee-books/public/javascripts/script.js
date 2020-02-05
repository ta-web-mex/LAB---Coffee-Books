mapboxgl.accessToken =
  'pk.eyJ1IjoiY2Zkcjg2IiwiYSI6ImNrNjgyb21tZDAwbnIzbHJzZTd0M2I2djMifQ.cfGqa7w2EEaJjy4TZigszw'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11'
})

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
    const latInput = document.querySelector('input[name="lat"]')
    const lngInput = document.querySelector('input[name="lng"]')
    latInput.value = lat
    lngInput.value = lng
    addressInput.value = address
  }
})