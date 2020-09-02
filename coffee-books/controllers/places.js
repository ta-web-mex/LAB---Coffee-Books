const Place = require("../models/Place")
const User = require("../models/User")


exports.indexView = (req, res) => {
    res.redirect("/")
}

//#region create

exports.createPlaceView = (req, res) => res.render("places/add")

exports.createPlace = async (req, res) => {
  // 1. extraemos la informacion del req.body
  const { name, description, placeType, lat, lng } = req.body
  // 2. creamos el lugar
  const location = {
    type: "Point",
    coordinates: [lng, lat]
  }

  console.log(req.body)

  const place = await Place.create({
    name,
    description,
    placeType,
    location
  })
  // 3. agregamos el id del lugar a la propiedad places del user en sesion
  await User.findByIdAndUpdate(req.user.id, { $push: { places: place._id } })
  // 4. redireccionamos al inicio
  res.redirect("/")
}

//#endregion

//#region update

exports.editPlaceView = async (req, res) => {
  const place = await Place.findById(req.params.placeId);
  res.render('places/update', place)
}

exports.editPlace = async (req, res) => {
  // 1. extraer la inormacion de req.body
  const { name, description, placeType, lat, lng } = req.body
  
  const location = {
    type: "Point",
    coordinates: [lng, lat]
  }
  
  const { placeId } = req.params
  await Place.findByIdAndUpdate(placeId, { name, description, placeType, location })
  res.redirect("/")
}

//#endregion

//#region delete

exports.deletePlace = async (req, res) => {
  const { placeId } = req.params
  await User.findByIdAndUpdate(req.user.id, { $pull: { places: placeId } })
  await Place.findByIdAndDelete(placeId)
  res.redirect("/")
}
////#endregion

//#region detalle

exports.detailPlaceView = async (req, res) => {
  const place = await Place.findById(req.params.placeId);
  res.render('places/detail', place)
}
//#endregion