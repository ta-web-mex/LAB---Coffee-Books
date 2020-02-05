const Place = require('../models/Place')

exports.sortPlaces = async (req, res) => {
    const places = await Place.find().sort({ createdAt: -1 })
    res.render('feeds', {places})
}