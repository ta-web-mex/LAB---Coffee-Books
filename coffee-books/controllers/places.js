const Place = require("../models/Place")
const User = require("../models/User")

exports.PlaceView = (req, res) => res.render("addPlace")

exports.createPlace = async(req, res) => {
    const { name, lat, lng, placeType } = req.body
    const location = {
        type: "Point",
        coordinates: [lng, lat]
    }
    const place = await Place.create({
        name,
        location,
        placeType
    })
    await User.findByIdAndUpdate(req.user.id, { $push: { places: place._id } })
    res.redirect("/")
}

exports.getPlaces = async(req, res) => {
    const places = await Place.find()
    res.render("index", { places })
}

exports.editPlace = async(req, res) => {
    const { name } = req.body
    const { placeId } = req.params
    await Place.findByIdAndUpdate(placeId, name)
    res.redirect("/")
}

exports.getPlace = async(req, res) => {
    const place = await Place.findById(req.params.placeId)
    res.render("placeDetail", place)
}

exports.deletePlace = async(req, res) => {
    const { placeId } = req.params
    await Place.findByIdAndDelete(placeId)
    res.redirect("/")
}