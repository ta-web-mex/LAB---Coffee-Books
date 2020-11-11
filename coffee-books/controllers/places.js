const Place= require("../models/Place.model")

exports.newPlaceForm=(req,res)=>{
  res.render("create")
}

exports.addNewPlace=async (req,res)=>{
  //1. Info del formato
  const {name, placeType}=req.body
  //2. Generar location
  
  //3. Crear place
  await Place.create({
    name,
    placeType
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
  const {name, placeType}=req.body
  const {placeId}=req.params
  await Place.findByIdAndUpdate(placeId, {name, placeType})
  res.redirect('/detail/${placeId}')
}

exports.deletePlace=async(req,res)=>{
  const {placeId}=req.params
  await Place.findByIdAndDelete(placeId)
  res.redirect('/')
}