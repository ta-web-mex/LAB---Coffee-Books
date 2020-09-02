const express = require('express');
const router  = express.Router();
const {
    signupProcess,
    signupView,
    loginView,
    loginProcess,
    googleProcess,
    googleRedirect,
    facebookProcess,
    facebookRedirect,
    private,
    logout,
    feeds
  } = require("../controllers/auth")

  const { enssureLogin } = require("../middlewares")

  const {
    getPlaces,
    createPlace,
    editPlace,
    deletePlace,
    getPlace,
    createPlaceView
  } = require("../controllers/places")

  
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/", signupView)
router.post("/", signupProcess)
router.get("/login", loginView)
router.post("/login", loginProcess)
router.get("/logout", logout)
router.get("/private", enssureLogin("/login"), private)
router.get("/feeds", feeds)



//==============GOOGLE===============
router.get("/auth/google", googleProcess)
router.get("/auth/google/callback", googleRedirect)
//==============FACEBOOK===============

router.get("/auth/facebook", facebookProcess)
router.get("/auth/facebook/callback", facebookRedirect)

//===========PLACES=========
// C
router.get("/places/new", enssureLogin("/login"), createPlaceView)
router.post("/places/new", enssureLogin("/login"), createPlace)
// U
router.post("/places/edit/:placeId", editPlace)
// D
router.get("/places/delete/:placeId", deletePlace)
// R
router.get("/places", getPlaces)
router.get("/places/:placeId", getPlace)


module.exports = router;