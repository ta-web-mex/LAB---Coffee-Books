const Place = require("../models/Place");
const User = require("../models/User")

exports.getPlaces =  async(req, res)=>{
  const places = await Place.find();
  res.render("places/home", {places})
}

//detail
exports.getPlace = async (req, res) => {
  const place = await Place.findById(req.params.placeId)
  res.render("places/detail", place)
}

//crear
exports.createView = (req,res)=>{
  res.render("places/create")
}

exports.createProcess = async(req, res)=>{
  const {name, placeType, lat, lng} = req.body;
  const location = {
    type: "Point",
    coordinates: [lng, lat]
  }
  const place = await Place.create({
    name,
    placeType,
    location
  })
  await User.findByIdAndUpdate(req.user.id, { $push: { places: place._id } })
  console.log(`agregando ${place.location.coordinates}`)
  res.redirect("/places/home")
}

//editar
exports.editView = async(req,res)=>{
  const place = await Place.findById(req.params.placeId)
  res.render("places/editar", place)
}

exports.editProcess = async(req, res)=>{
  const {name, placeType} = req.body;
  const {placeId} = req.params;
  await Place.findByIdAndUpdate(placeId, {name, placeType})
  res.redirect("/places/home")
}

//eliminar
exports.deleteProcess = async(req,res)=>{
  const { name }=req.body;
  await Place.findOneAndDelete(name);
  res.redirect("/places/home")
}