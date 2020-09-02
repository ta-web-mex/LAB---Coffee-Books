const express = require('express');
const router  = express.Router();

const {
  signupView,
  signupProcess,
  loginView,
  loginProcess,
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


//Places

//C
//R
router.get("/places", placesView)

//U
//D

module.exports = router;
