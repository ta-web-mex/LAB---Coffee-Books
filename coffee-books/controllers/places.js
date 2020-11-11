const Place = require("../models/Place")

exports.newPlaceForm = (req, res) => {
  res.render("auth/create", {
    token: 'pk.eyJ1IjoibGVvb2NtIiwiYSI6ImNraGQ1azVmNDA5a3IycXFyMnZ0dDNmNGYifQ.XinvhCKUocw8WTbseWBa9w'
  })
}

exports.addNewPlace = async (req, res) => {
  // 1.Obtener la info del form
  const { name, placeType, lat, lng } = req.body
  // 2. Crear el lugar
  const location = {
    type: "Point",
    coordinates: [lng, lat]
  }
  // 3. Crear registro
  await Place.create({
    name,
    placeType,
    location
  })
  // 4. redirigir
  res.redirect("/private-page")
}

exports.editPlaceForm = (req,res,next) => {
  res.render("auth/update", {
    token: 'pk.eyJ1IjoibGVvb2NtIiwiYSI6ImNraGQ1azVmNDA5a3IycXFyMnZ0dDNmNGYifQ.XinvhCKUocw8WTbseWBa9w'
  })
}

exports.editPlace = async (req, res,next) => {
  const { name, placeType, lat, lng } = req.body
  const {placeId} = req.params
  const location = {
    type: "Point",
    coordinates: [lng, lat]
  }

  await Place.findByIdAndUpdate(placeId, { name, placeType, location})

  res.redirect("/private-page")
}