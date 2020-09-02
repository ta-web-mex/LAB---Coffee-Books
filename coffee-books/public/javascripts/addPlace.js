window.onload = () => {
    const gc = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
})
    gc.on("result", e => {
        const [lng, lat] = e.result.center
        const $lng = document.querySelector("#lng")
        const $lat = document.querySelector("#lat")
        $lng.value = lng
        $lat.value = lat
    })
    map.addControl(gc)
}