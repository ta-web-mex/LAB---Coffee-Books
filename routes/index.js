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
} = require('../controllers/index')


const {
  placeView,
  placeDetail,
  newPlace,
  newPlaceProcess,
  placeDelete,
  editPlaceGet,
  editPlacePost,
} = require('../controllers/place')

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

//Crear
router.get('/place/new', newPlace)
router.post('/place/new', newPlaceProcess)
//Read
router.get('/place', placeView)
router.get('/place/:id', placeDetail)
//Update
router.get('/place/edit/:id', editPlaceGet)
router.post('/place/edit/:id', editPlacePost)
//Delete
router.get('/place/delete/:id', placeDelete)

module.exports = router;