const Place = require('../models/Places')

exports.createGet = (_, res) => {
  const options = ['coffee shop', 'book store']
  res.render('createPlace', { options })
}

exports.createPost = async (req, res) => {
  const { name, address, latitude, longitude, placeType} = req.body
  const newPlace = {
    name,
    placeType,
    location: {
      address,
      coordinates: [longitude, latitude]
    }
  }
  const { _id } = await Place.create(newPlace)
  res.redirect(`/places`)
}

exports.detailGet = async (req, res) => {
  const { id } = req.params
  const place = await Place.findById(id)
  res.render('detail', place)
}