const express = require('express');
const router  = express.Router();
const passport = require('passport')
const { 
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logout,
  loginFacebook,
  loginFacebookCb,
  loginGoogle,
  loginGoogleCb
} = require('../controllers/index.controller')


const {
  placeView,
  placeDetail,
  newPlace,
  newPlaceProcess,
  placeDelete,
  editPlaceGet,
  editPlacePost,
} = require('../controllers/place.controller')

const ensureLogin = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.redirect('/login');
};



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// Signup Route

router.get('/signup', signupGet)
router.post('/signup', signupPost)

// Login Route

router.get('/login', loginGet)
router.post('/login', loginPost)

// Logout Route

router.get('/logout', logout)


router.get('/auth/facebook', loginFacebook)
router.get('/auth/facebook/callback', loginFacebookCb)

router.get('/auth/google', loginGoogle)
router.get('/auth/google/callback', loginGoogleCb)

//////////////////////////////////////PLACES///////////////////////////////////////////

//Crear
router.get('/place/new', ensureLogin, newPlace)
router.post('/place/new', ensureLogin, newPlaceProcess)
//Read
router.get('/place', ensureLogin, placeView)
router.get('/place/:id', ensureLogin, placeDetail)
//Update
router.get('/place/edit/:id', ensureLogin, editPlaceGet)
router.post('/place/edit/:id', ensureLogin, editPlacePost)
//Delete
router.get('/place/delete/:id', ensureLogin, placeDelete)

module.exports = router;
