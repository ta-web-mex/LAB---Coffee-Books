const Place = require('../models/Places')

exports.indexGet = async (_, res) => {
    const places = await Place.find().sort({ createdAt: -1 })
    res.render('places', { places })
  }

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
  console.log(req.body)
  const { _id } = await Place.create(newPlace)
  res.redirect(`/places`)
}

exports.detailGet = async (req, res) => {
  const { id } = req.params
  const place = await Place.findById(id)
  res.render('detail', place)
}

exports.deleteGet = async (req, res) => {
    const {_id} = req.params;
    await Place.findByIdAndDelete(_id);
    res.redirect('/places')
}

