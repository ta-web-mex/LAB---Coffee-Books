const User = require("../models/User")
const Place = require("../models/Place")

// C
exports.createPlaceView = (req, res) => res.render("createPlace")

exports.createPlaceProcess = async (req, res) => {
    const { name, description, lng, lat} = req.body
    const location = {
        type: "Point",
        coordinates: [lng, lat]
    }
    const place = await Place.create({
        name,
        description,
        location
    })
    await User.findByIdAndUpdate(req.user.id, { $push: { places: place._id } })
    res.redirect("/places")
}

// R

exports.placesView = async (req, res) => {
    const places = await Place.find()
    res.render("places", { places })
}

exports.placeView = async (req, res) => {
    const { placeId } = req.params
    const place = await Place.findById(placeId)
    res.render("placeDetail", place)
}

// U

exports.editPlaceView = (req, res) => res.render("editPlace")

exports.editPlace = async (req, res) => {
    const { name, description, lat, lng } = req.body
    await Place.findByIdAndUpdate(req.params.placeId, { name, description, lat, lng })
    res.redirect("/places")
}

//D

exports.deletePlace = async (req, res) => {
    await Place.findByIdAndDelete(req.params.placeId)
    res.redirect("/places")
}

