const express = require('express')
const router = express.Router()
const passport = require('passport')

const ensureLogin = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.redirect('/login')
}

const {
  signupView,
  signupPost,
  loginView,
  loginPost,
  loginFb,
  loginFbCallback,
  loginGoogle,
  loginGoogleCallback,
  profileView,
  addPlaceView,
  addPlacePost,
  placesView,
  detailView,
  deletePlace,
  editView,
  editPost,
} = require('../controllers/coffee')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/login', loginView)
router.post('/login', loginPost)

router.get('/signup', signupView)
router.post('/signup', signupPost)

router.get('/profile', profileView)

router.get('/auth/facebook', loginFb)
router.get('/auth/facebook/callback', loginFbCallback)

router.get('/auth/google', loginGoogle)
router.get('/auth/google/callback', loginGoogleCallback)

router.get('/addplace', ensureLogin, addPlaceView)
router.post('/addplace', ensureLogin, addPlacePost)

router.get('/showplaces', ensureLogin, placesView)

router.post('/showplaces/:id/delete', ensureLogin, deletePlace)

router.get('/:id', ensureLogin, detailView)

router.get('/edit/:id', ensureLogin, editView)
router.post('/edit/:id', ensureLogin, editPost)

module.exports = router
