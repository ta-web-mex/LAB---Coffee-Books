const Place = require('../models/Place')

exports.getAll = async (req, res) => {
    const places = await Place.find().populate("albums")
    res.render("crud", { places })
}

exports.createView = (req, res) => {
    const options = ['coffee shop', 'booksstore']
    res.render('create', {options})
}

exports.create = async (req, res) => {
    if(req.params){
        return update()
    } else {
        const { name, address, latitude, longitude, placeType } = req.body
        const newPlace = {
          name,
          placeType,
          location: {
            address,
            coordinates: [longitude, latitude]
          }
        }
        const { _id } = await Place.create(newPlace)
        res.redirect(`/places/${_id}`)
    }

}

exports.getDetail = async (req, res) => {
        const { id } = req.params
        const place = await Place.findById(id)
        res.render('place-detail', place)
}

exports.updateView = async(req, res) => {
    const place = await Place.findById(req.params)
    res.render('create', place)
}

exports.update = async (req, res) => {
    const {name, adress, latitude, longitude, placeType } = req.body;
    await Place.findByIdAndUpdate(req.params, { name, adress, latitude, longitude, placeType }); //no supimos como actualizar cuando esta mas adentro del objeto
    res.redirect('/showall');
}

exports.delete = async (req, res) => {
    await Place.findByIdAndDelete(req.params);
    res.redirect("/showall");
}
