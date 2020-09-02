const express = require('express');
const router  = express.Router();

const {
  signupView,
  signupProcess,
  loginView,
  loginProcess,
  googleProcess,
  googleRedirect,
  facebookProcess,
  facebookRedirect
} = require("../controllers/auth")

const {
  placesView,
  placeView,
  createPlaceProcess,
  createPlaceView,
  editPlace,
  editPlaceView,
  deletePlace
} = require("../controllers/places")

const {
  enssureLogin
} = require("../middlewares")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


//Signup local
router.get("/signup", signupView)
router.post("/signup", signupProcess)

//Login local
router.get("/login", loginView)
router.post("/login", loginProcess)

//Google
router.get("/auth/google", googleProcess)
router.get("/auth/google/callback", googleRedirect)

//Facebook
router.get("/auth/facebook", facebookProcess)
router.get("/auth/facebook/callback", facebookRedirect)



//Places

//C
router.get("/places/new", enssureLogin("/login"), createPlaceView)
router.post("/places/new", enssureLogin("/login"), createPlaceProcess)

//R
router.get("/places", placesView)
router.get("/places/:placeId", placeView)

//U
router.get("/places/edit/:placeId", editPlaceView)
router.post("/places/edit/:placeId", editPlace)

//D
router.get("/places/delete/:placeId", deletePlace)


module.exports = router;
