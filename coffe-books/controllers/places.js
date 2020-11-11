const Place = require("../models/Place")

exports.newPlaceForm = (req, res) => {
    res.render("places/new-place", {
        token: process.env.MAPBOX_TOKEN
    })
}

exports.addNewPlace = async (req, res) => {
    const {
        name,
        description,
        lat,
        lng
    } = req.body
    console.log(name, description, lat, lng)
    const location = {
        type: "Point",
        coordinates: [lng, lat]
    }
    await Place.create({
        name,
        description,
        location
    })
    res.redirect("/dashboard")
}
// exports.dashboardView = async (res, req) => {
//     const places = await Place.find()
//     // res.render("auth/dashboard", { token: process.env.MAPBOX_TOKEN, places })
//     res.render("dashboard")
// }

exports.detailPlaceView = async (req, res) => {
    const place = await Place.findById(req.params.placeId)
    res.render("place-detail", {
        token: process.env.MAPBOX_TOKEN,
        place
    })
}
