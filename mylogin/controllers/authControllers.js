const mongoose = require('mongoose')
const User = require('../models/User')
const place = require('../models/places')

exports.signupView = (req,res)=>{
  const config  = {
    register: true,
    action: 'signup'
  }
  res.render('auth/signup', config)
}

exports.loginView = (req, res)=>{
    const config  = {
      register: false,
      action: 'login'
    }
res.render('auth/signup', config)
}
exports.profileView = (req,res) => {
res.render('privates/profile')
}

exports.createEvent = (req,res,next) =>{
  res.render('privates/createEvent')
}
exports.createEventPost =  (req, res) => {
  console.log(place);
  
  const { name, address, latitude, longitude, placeType } = req.body
  console.log(req.user);
  console.log(req.body);
  
  const newPlace = {
    name,
    placeType,
    location: {
      address:address,
      coordinates: [longitude, latitude]
    }
  }

  console.log(newPlace);
  
    place.create(newPlace).then(res=>{
    // console.log(res)
    console.log('oñiashfdñajsdñouihjñuioh')
  }).catch(err=>console.log(err))
  res.redirect("privates/createEvent")

 }


exports.placeGet = async (req, res) => {
  const { id } = req.params
  const place = await Place.findById(id)
  res.render('privates/profile', place)
}
exports.logout = async (req, res) => {
    await req.session.destroy()
    await req.logout()
     res.redirect("/")
}