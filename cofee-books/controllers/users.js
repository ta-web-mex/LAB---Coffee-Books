const Place = require('../models/Place')
const User = require('../models/User')

exports.places = (_, res) => {
  res.render('user/places');
}

// PATCH, POST, GET, DELETE

//POST
exports.placeGet = (_, res) =>{
  res.render('user/create')
}

exports.placePost = async (req, res, next) =>{
  console.log(req.body)
  const place = await Place.create({...req.body});
  res.redirect("/feed");
}

exports.placeDelete = async(req, res, next) => {
  const {id} = req.params
  Place.findByIdAndDelete(id)
      .then(() => res.redirect("/create"))
      .catch(err => console.log(err))
}

exports.placeUpdate = async(req, res, next)=>{
  await Place.findByIdAndRemove(place.id);
  res.redirect('/feed')
}
/*
exports.placeModify = async (req, res, next)=>{
  const place = await Place.
}
exports.placeDetail*/


