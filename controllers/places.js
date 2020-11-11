const Place = require('../models/Place')
const User = require('../models/User')

exports.addNewPlace = async (req, res) => {
  // 1.Obtener la info del form
  const placeId = req.user._id

  const { name, placeType, lat, lng } = req.body
  // 2. Crear el lugar
  const location = {
    type: "Point",
    coordinates: [lng, lat]
  }
  // 3. Crear registro
  const newPlace = await Place.create({
    name,
    placeType,
    location
  })
  
  await User.findByIdAndUpdate(placeId, { $push: { places: newPlace._id } })

  res.redirect("/")
}

exports.removePlace = async (req, res) => {
  const { id } = req.params
  await Place.findByIdAndDelete(id)
  res.redirect('/')
}