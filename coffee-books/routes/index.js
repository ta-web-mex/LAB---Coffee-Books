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
  placesView
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
//R
router.get("/places", placesView)

//U
//D

module.exports = router;
