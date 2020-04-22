const User = require('../models/User')
const passport = require('passport')
const Place = require('../models/Place')

//--------------STRATEGIES--------------------
exports.signupView = (req, res) => {
  res.render('signup')
}

exports.signupPost = (req, res) => {
  const { name, email, password, verify } = req.body
  if (password !== verify) {
    return res.render('signup', { error: 'Passwords don`t match' })
  } else {
    User.register({ email, name }, password)
      .then(() => {
        res.redirect('/login')
      })
      .catch((err) => err)
  }
}

exports.loginView = (req, res) => {
  res.render('login')
}

exports.loginPost = passport.authenticate('local', {
  successRedirect: '/addplace',
  failureRedirect: '/login',
})

exports.profileView = (req, res) => {
  res.render('profile')
}

exports.loginFb = passport.authenticate('facebook', { scope: ['email'] })

exports.loginFbCallback = passport.authenticate('facebook', {
  successRedirect: '/addplace',
  failureRedirect: '/login',
  scope: ['email'],
})

exports.loginGoogle = passport.authenticate('google', { scope: ['email'] })

exports.loginGoogleCallback = passport.authenticate('google', {
  successRedirect: '/addplace',
  failureRedirect: '/login',
  scope: ['email'],
})

//-------------CRUD PLACES---------------------

exports.placesView = async (req, res) => {
  const places = await Place.find()
  res.render('showplaces', { places })
}

exports.addPlaceView = (req, res) => res.render('addplace')

exports.addPlacePost = async (req, res) => {
  console.log(req.body)
  const { name, placeType, longitud, latitud } = req.body
  const location = {
    type: 'Point',
    coordinates: [longitud, latitud],
  }
  await Place.create({
    name,
    location,
    placeType,
  })
  res.redirect('/showplaces')
}

exports.deletePlace = async (req, res) => {
  const { id } = req.params
  await Place.findByIdAndRemove(id)
  res.redirect('/showplaces')
}

exports.detailView = async (req, res) => {
  const { id } = req.params
  const place = await Place.findById(id)
  res.render('detail', place)
}

exports.editView = async (req, res) => {
  const { id } = req.params
  const place = await Place.findById(id)
  res.render('edit', place)
}

exports.editPost = async (req, res) => {
  const { id } = req.params
  await Place.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true })
  res.redirect(`/edit/${id}`)
}
