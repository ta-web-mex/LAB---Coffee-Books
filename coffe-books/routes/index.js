const express = require('express');
const router  = express.Router();
const {signupView, signupProcess, loginView, googleInit, googleCallback, logout, facebookCallback, facebookInit} = require('../controllers/auth')
const {
  newPlaceForm,
  addNewPlace,
  detailPlaceView
} = require("../controllers/places")
const Place = require("../models/Place")
/* GET home page */
router.get('/',  (req, res, next) => {

  res.render('index');
});

router.get("/signup", signupView)

router.post("/signup", signupProcess)

router.get("/login", loginView)

router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCallback)

router.get("/auth/facebook", facebookInit)
router.get("/auth/facebook/callback", facebookCallback)

router.get('/dashboard', async (req, res)=> {
  const places = await Place.find()
  console.log(places)
  res.render('auth/dashboard', places)
})




router.get("/place/add", newPlaceForm)
router.post("/place/add", addNewPlace)
// router.get("/place/:placeId", catchErrors(detailPlaceView))

router.get('/logout', logout)

module.exports = router;
