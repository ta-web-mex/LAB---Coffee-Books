const Place = require('../models/Places')
const { update } = require('../models/Places')

// Show all places on the list
exports.listPlaces = async (req, res, next) => {
  // Get all places on the db
  const allPlaces = await Place.find()
  res.render('./places', {allPlaces})
}
// C
exports.createPlaceForm = (req, res, next) =>{
  res.render('./places/new')
}
exports.createPlace = async (req, res, next) => {
  // get info from reqbody
  const {name, placeType} = req.body
  const newPlace = await Place.create({name, placeType})
  res.render('./places')
}
// R
exports.viewPlace = (req, res, next) => {
  // get id from params
  const placeId = req.params.id
  res.render(`./places/${placeId}`)
}
// U
exports.editPlaceForm = (req, res, next) => {
  res.render('./places/edit')
}
exports.editPlace = async (req, res, next) => {
  // get id from params
  const placeId = req.params.id
  // get updates from form
  const {name, placeType} = req.body
  // write params to the place
  const updatedPlace = await Place.findByIdAndUpdate(placeId, {name, placeType})
  res.render('./places')
}
// D
exports.deletePlace = async (req, res, next) => {
  // get id from params
  const placeId = req.params.id
  // delete place 
  await Place.findByIdAndDelete(placeId)
}