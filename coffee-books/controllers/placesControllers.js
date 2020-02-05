const Places = require("../models/places")


exports.createPlaceView=(req,res,next)=>{
  res.render("folder/create")
}

exports.placesView=(req,res,next)=>{
  res.render("folder/places")
}


// R in CRUD
exports.getPlaces = async(req, res) =>{
  const places = await Places.find().populate("places")
  res.render("folder/places", { places })
}


exports.createPlace = async (req, res) =>{ 
  const {name, location} =req.body;
  await Places.create ({
    name,
    location
  })
  res.redirect("/")
}

exports.updatePlacesView = async (req, res) => {
  const Places = await Places.find.ById(req.params.placesid)
  res.render("update-places")




}