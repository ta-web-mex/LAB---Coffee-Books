const express = require('express')
const router = express.Router()
const passport = require('passport')

const {
  loginView,
  signupView,
  signupProcess,
  loginProcess,
  showPlaces,
} = require('../controllers/index')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/login', loginView)
router.get('/signup', signupView)
router.post('/signup', signupProcess)
router.post('/login', loginProcess)
router.get('/map', (req, res, next) => {
  res.render('map')
})


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/places',
    failureRedirect: '/login',
    scope: ['email'],
  })
)

router.get('/places', showPlaces)

module.exports = router
