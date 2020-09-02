window.onload = () => {
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
    geocoder.on('result', event => {
        const [lng, lat] = event.result.center
        const $lat = document.querySelector('#lat')
        const $lng = document.querySelector('#lng')
        $lat.value = lat
        $lng.value = lng
    })
    map.addControl(geocoder)
}