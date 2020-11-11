const Place= require("../models/Place.model")

exports.newPlaceForm=(req,res)=>{
  res.render("create", {
    token: process.env.MAPBOX_TOKEN
  })
}


exports.addNewPlace=async (req,res)=>{
  //1. Info del formato
  const {name, placeType, lat, lng}=req.body
  //2. Generar location
  const location={
    type:"Point",
    coordinates:[lng,lat]
  }
  //3. Crear place
  await Place.create({
    name,
    placeType,
    location
  })
  //4. Redirigir al feed
  res.redirect('/')
}

exports.detailPlace=async(req,res)=>{
  const {placeId}=req.params
  const place=await Place.findById(placeId)
  console.log(place)
  res.render('detail', place)
}

exports.editPlace=async(req,res)=>{
  const place=await Place.findById(req.params.placeId)
  res.render("update", place)
}

exports.updatePlace=async(req,res)=>{
  const {name, placeType, lat, lng}=req.body
  const {placeId}=req.params
  const location={
    type:"Point",
    coordinates:[lng,lat]
  }
  await Place.findByIdAndUpdate(placeId, {name, placeType, location})
  res.redirect('/places')
}

exports.deletePlace=async(req,res)=>{
  const {placeId}=req.params
  await Place.findByIdAndDelete(placeId)
  res.redirect('/')
}

