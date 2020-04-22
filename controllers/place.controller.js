const Place = require('../models/Place')
const passport = require('../config/passport')

exports.placeView = async (req, res) => {
  const place = await Place.find({}).sort({ name: 1 })
  res.render('places/places', { place })
}

exports.placeDetail = async (req, res) => {
  const placeDet = await Place.findById(req.params.id)
  res.render('places/placesDetail', placeDet)
}

exports.newPlace = (req, res) => {
  res.render('places/new')
}

exports.newPlaceProcess = async (req, res) => {
  const { name, longitude, latitude, placesType } = req.body;
  const location = {
    type: "Point",
    coordinates: [longitude, latitude],
  };
  await Place.create({
    name,
    location,
    placesType,
  })
    res.redirect('/place')
}

exports.placeDelete = async (req, res) => {
  const borrar = req.params.id
  await Place.findByIdAndRemove(borrar)
  console.log(borrar)
  res.redirect('/place')
}

exports.editPlaceGet = async (req, res) => {
  const edit = req.params.id
  const plac = await Place.findById(edit)
  res.render('places/edit', plac)
}

exports.editPlacePost = async (req, res) => {
  const edit = req.params.id
  console.log(edit)
  await Place.findByIdAndUpdate(edit, { $set: { ...req.body } }, { new: true })
  res.redirect(`/place`)
}


