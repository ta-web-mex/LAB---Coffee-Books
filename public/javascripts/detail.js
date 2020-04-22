mapboxgl.accessToken =
'pk.eyJ1Ijoia2V2aW5nbWNjIiwiYSI6ImNrOWF0cGd4ZDI2eWgzaW15bGw0dzQzYmYifQ.MOJsQX40KvFSCrvwSBHbaA'

const map = new mapboxgl.Map({
container: "map",
style: "mapbox://styles/mapbox/streets-v11",
zoom: 15,
center: [{{ location.coordinates }}]
});

new mapboxgl.Marker().setLngLat([{{ location.coordinates }}]).addTo(map)