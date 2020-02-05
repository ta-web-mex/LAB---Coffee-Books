const User = require('../models/User')
const Place = require('../models/places')



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
exports.createEventPost = async (req, res) => {
  const { name, address, latitude, longitude, placeType } = req.body
  const newPlace = {
    name,
    placeType,
    location: {
      address,
      coordinates: [longitude, latitude]
    }
  }
  console.log(newPlace)
  const { _id } = await Place.create(newPlace)
  res.redirect("privates/profile")
// exports.signupPost = async (req, res) =>{

 }


exports.placeGet = async (req, res) => {
  const { id } = req.params
  const place = await Place.findById(id)
  res.render('privates/profile', place)
}
exports.logout = (req, res) => {
  req.logout();
  console.log(req.logout());
   res.redirect("/login");
}