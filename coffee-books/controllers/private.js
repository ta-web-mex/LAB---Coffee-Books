const Place = require("../models/Place")
const User = require("../models/User")

exports.profileView = (req, res) => res.render("private/profile")

exports.placesView = async(req, res) => {
    const places = await Place.find()
    res.render("private/places", { places })
}

exports.placesCreate = (req, res) => res.render("private/createPlace")

exports.placesCreateMethod = async(req, res) => {
    const { name, placeType, lat, lng } = req.body
    const location = {
        type: "Point",
        coordinates: [lng, lat]
    }
    const newPlace = await Place.create({ name, placeType, location })
    const userId = req.user
    await User.findByIdAndUpdate(userId, { $push: { places: newPlace._id } })
    res.redirect('/places')
}

exports.placeEdit = async(req, res) => {
    const plId = req.params.placeId
    const placeToEdit = await Place.findById(plId)
    res.render("private/edit", { placeToEdit })
}

exports.placeEditMethod = async(req, res) => {
    const { placeId } = req.params
    const { name, placeType } = req.body;
    await Place.findByIdAndUpdate(placeId, { name, placeType })
    res.redirect("/places")
}

exports.placeDelete = async(req, res) => {
    await Place.findByIdAndRemove(req.params.placeId)
    res.redirect('/places')
}