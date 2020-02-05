const Place = require('../models/Place')

exports.placeView = async (res,req,next) => {7
  const places = await Place.find().sort({createdAt: -1})
  req.render('places/places', {places})
}

exports.createView = async (req,res,next) => {
  res.render('places/create')
}

exports.updateView = async (req,res,next) => {
  res.render('places/create')
}

exports.createPost = async (req,res,next) => {
  const { name, address, latitude, longitude, placeType} = req.body
  const newPlace = {
    name,
    location: {
      address,
      coordinates: [longitude, latitude]
    },
    placeType
  }
  await Place.create(newPlace)
  res.redirect(`/places`)
}

exports.deletePlace = async (req,res,next) => {
  await Place.findOneAndDelete(req.params.id)
  res.redirect('/places')
}

exports.editView = async (req,res,next) => {
  const place = await Place.findOne({_id: req.params.id})
  res.render('places/edit', place)
}

exports.editPost = async (req,res,next) => {
  const { name, address, latitude, longitude, placeType} = req.body
  const updatePlace = {
    name,
    location: {
      address,
      coordinates: [longitude, latitude]
    },
    placeType
  }
  await Place.findByIdAndUpdate({_id: req.params.idEdit}, updatePlace)
  res.redirect(`/places`)
}