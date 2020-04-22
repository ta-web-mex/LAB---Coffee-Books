const express = require('express');
const router = express.Router();

//middlewares
const ensureLogin = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.redirect('/login');
};

//  home page
router.get('/', (req, res) => res.render('index'));

// auth controllers
const {
  signupView,
  signupPost,
  loginView,
  loginPost,
  loginFB,
  loginFBCall,
  loginG,
  loginGCall,
  logout,
} = require('../controllers/auth');
// auth local
router.get('/signup', signupView);
router.post('/signup', signupPost);
router.get('/login', loginView);
router.post('/login', loginPost);
router.get('/logout', ensureLogin, logout);
// auth facebook
router.get('/loginFacebook', loginFB);
router.get('/loginFacebook/callback', loginFBCall);
// auth google
//router.get('/loginGoogle', loginG);
//router.get('/loginGoogle/callback', loginGCall);

//
const {
  listPlaces,
  addPlace,
  addPlaceProcess,
  detailPlace,
  placeDelete,
  editPlace,
  editPlaceProcess
} = require('../controllers/places');

router.get('/yourPlaces', listPlaces);
router.get('/addPlace', addPlace);
router.post('/addPlace', addPlaceProcess);
router.get('/placeDetail/:id', detailPlace);
router.get('/placeDelete/:id', placeDelete);
router.get('/placeEdit/:id', editPlace);
router.post('/placeEdit/:id', editPlaceProcess);

module.exports = router;
