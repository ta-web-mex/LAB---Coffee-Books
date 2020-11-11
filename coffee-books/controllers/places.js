const bcrypt = require("bcrypt")
const Place = require("../models/Place")
const passport =require("../config/passport")


exports.savePlace = async (req, res) => {
    // 1.Obtener la info del form
    const { name, type, address, lat, lng } = req.body
    // 2. Crear el lugar

    const location = {
      address: address,
      coordinates: [lng, lat]
    }
    // 3. Crear registro
    await Place.create({
      name,
      type,
      address,
      location
    })
    // 4. redirigir
    res.redirect("/private-page")
  }


exports.updatePlace= async (req, res) => {
    console.log(req.params)
    const place = await Place.findById(req.params.placeId)
    res.render(`/update/${placeId}`, place)
  }
  
  exports.editPlace= async (req, res) => {
    const {  name, type, address, lat, lng} = req.body
    const { placeId } = req.params
    await Place.findByIdAndUpdate(placeId, { name, type, address, lat, lng })
    res.redirect(`/edit/${placeId}`)
  }
  
  exports.deletePlace= async (req, res) => {
    const { placeId } = req.params
    await Place.findByIdAndDelete(placeId)
    res.redirect(`/delete/${placeId}`)
  }

exports.detailsPage= async (req, res) => {
    const {placeId } = req.params
    res.render(`/detail/${placeId}`)
}