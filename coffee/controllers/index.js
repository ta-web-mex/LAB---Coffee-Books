const User = require('../models/User')
const passport = require('../config/passport')
const Place = require('../models/Place')

// exports.indexGet = (req, res) => res.render('index')

exports.signupGet = (req, res) => {
  const config = {
    action: '/signup',
    title: 'Sign up',
    button: 'Create account',
  }
  res.render('auth/signup', config)
}

exports.signupPost = (req, res) => {
  const { name, email, password, verify } = req.body
  const config = {
    action: '/signup',
    title: 'Sign up',
    button: 'Create account',
  }
  if (password !== verify) {
    return res.render('auth/signup', config)
  } else {
    User.register({ name, email }, password)
      .then(() => res.redirect('/login'))
      .catch((err) => {
        config.error = err.message
        return res.render('auth/signup', config)
      })
  }
}

exports.loginGet = (req, res) => {
  const config = {
    action: '/login',
    title: 'Log in',
    button: 'Login',
  }
  res.render('auth/login', config)
}

exports.loginPost = passport.authenticate('local', {
  successRedirect: '/place',
  failureRedirect: '/login',
})

exports.loginFacebook = passport.authenticate('facebook', { scope: ['email'] })

exports.loginFacebookCb = passport.authenticate('facebook', {
  successRedirect: '/place',
  failureRedirect: '/login',
  scope: ['email'],
})

exports.placeGet = (req, res) => {
  res.render('auth/place')
}

exports.addPlace = (req, res) => {
  res.render('auth/new')
}
exports.sendPlace = async (req, res) => {
  const { name, longitude, latitude } = req.body
  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  }
  await Place.create({
    name,
    location,
  })
  res.redirect('/place')
}

exports.placesView = async (req, res) => {
  const places = await Place.find()
  console.log(places)
  res.render('index', { places })
}
exports.detailPlace = async (req, res) => {
  const { id } = req.params

  const place = await Place.findById(id)

  res.render('auth/detail', place)
}

exports.deletePlace = async (req, res, next) => {
  await Place.findByIdAndRemove(req.params.id)
  res.redirect('/')
}
// exports.editPlaceGet = async (req, res) => {
//   const edit = req.params.id
//   const place = await Place.findById(edit)
//   // res.render('places/edit', place)
// }

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}
