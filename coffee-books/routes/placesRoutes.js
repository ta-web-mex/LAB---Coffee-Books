const router = require('express').Router()
const Place = require('../models/Place')
const { isAuthenticated } = require("../middlewares");

router.get('/create', isAuthenticated, (req, res)=>{
  res.render('places/create')
})

.get('/feeds', async (req, res) => {
  const places = await Place.find().sort({createdAt: -1})
  if( req.isAuthenticated() ) places.map(place => place.auth = true)
  console.log(places)
  res.render('places/feeds', {places})
})

.get('/delete/:id', async (req, res) =>{
  console.log(req.params.id)
  await Place.findByIdAndDelete(req.params.id)
  res.redirect('/places/feeds')
})

.post('/create', isAuthenticated, async (req, res, next) => {
  const { name, address, placeType, lat, lng } = req.body
  const newPlace = {
    name,
    placeType,
    location: {
      address: address,
      coordinates: [lng, lat]
    }
  }

  await Place.create(newPlace)
  res.redirect('/places/feeds')
})
module.exports= router