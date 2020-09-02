const User = require('../models/User')
const Place = require('../models/Place')

exports.getPlaces = async(req, res) => {
    const places = await Place.find()
    res.render('places/places', {
        user: req.user,
        places
    })
}

exports.getPlace = async(req, res) => {
    const place = await Place.findById(req.params.placeId)
    res.render('places/place', {
        user: req.user,
        place
    })
}

exports.addPlaceView = (req, res) => {
    res.render('places/newPlace', {
        user: req.user
    })
}

exports.addPlaceProcess = async(req, res) => {
    const {
        name,
        placeType,
        lat,
        lng
    } = req.body
    const newPlace = await Place.create({
        name,
        placeType,
        location: {
            type: 'Point',
            coordinates: [lng, lat]
        }
    })
    await User.findByIdAndUpdate(req.user.id, {
        $push: {
            places: newPlace._id
        }
    })
    res.redirect(`/places`)
}

exports.editPlaceView = async(req, res) => {
    const place = await Place.findById(req.params.placeId)
    res.render('places/editPlace', {
        user: req.user,
        place
    })
}

exports.editPlaceProcess = async(req, res) => {
    const {
        name,
        placeType,
        lat,
        lng
    } = req.body
    const place = await Place.findByIdAndUpdate(req.params.placeId, {
        name,
        placeType,
        location: {
            type: 'Point',
            coordinates: [lng, lat]
        }
    })
    res.redirect(`/places/${place._id}`)
}

exports.deletePlace = async(req, res) => {
    await Place.findByIdAndDelete(req.params.placeId)
    res.redirect('/places')
}