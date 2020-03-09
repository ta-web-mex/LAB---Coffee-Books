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
  console.log( `Session:abjdlasjkbhdasj,lbhd ${req}`);
  console.log( `User: ${req.user}`);
  
  
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
  const { _id } = await Place.create(newPlace)
  res.redirect("privates/profile")

 }


exports.placeGet = async (req, res) => {
  const { id } = req.params
  const place = await Place.findById(id)
  res.render('privates/profile', place)
}
exports.logout = async (req, res) => {
    console.log(req.session);
    await req.session.destroy()

    req.logOut();
    res.redirect("/");
}