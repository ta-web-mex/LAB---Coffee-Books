const express = require('express');
const router = express.Router();
// Require user model
const User = require("../models/User")
// Require the place model
const Place = require("../models/Place")
// Add bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
//Add controllers
const {
  signupView,
  signupProcess,
  loginView,
  loginProcess,
  privatePage,
  logout,
  googleInit,
  googleCb, 
} = require("../controllers/auth")
const {
  newPlaceForm,
  addNewPlace,
  editPlaceForm,
  editPlace,
  detailPlaceView
} = require("../controllers/places")

const { catchErrors } = require("../middlewares/index")

const { isAuth, isNotAuth, checkRoles } = require("../middlewares")

//==============FEED=======================
router.get('/feeds', async (req, res, next) => {
  const places = await Place.find({},{},{createdAt: 1})
  console.log(places)
  res.render("feeds", { places })
});


/*
// Add passport
const passport = require("../config/passport")
//Ensure login is to make sure that the user is logged in before viewing this page.
const ensureLogin = require('connect-ensure-login');
router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('auth/private', { user: req.user });
});*/

//====================Auth==================== //Validates sif user is authenticated
router.get("/signup", isNotAuth, signupView)
router.post("/signup", isNotAuth, signupProcess)
router.get("/login", isNotAuth, loginView)

// Pasamos el middleware que restringe el acceso a esta ruta al post para que no nos envien informacion desde herramientas de terceros (POSTMAN)
router.post("/login", isNotAuth, loginProcess)

//router.get("/private-page", isAuth, privatePage)

//Logouts user
router.get("/logout", logout)

// ==================SOCIAL===================


router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)

//=================PLACES======================

router.get("/private-page", async (req, res) => {
  const places = await Place.find()
  console.log(places)
  res.render("auth/private", { places })
})
/*//Mostrar el form para crear un lugar
router.get("/place/create", (req, res) => {

  res.render("auth/create")
})
//Recibir la informacion para crear un lugar
router.post("/place/create", async (req, res) => {
  const { name, placeType } = req.body
  const place = await Place.create({ name, placeType})
  await Place.findByIdAndUpdate(req.placeId, { $push: { places: place._id } })
  res.redirect("/private-page")
})*/


router.get("/place/edit/:placeId", async (req, res) => {
  const place = await Place.findById(req.params.placeId)
  res.render("auth/update", place)
})
router.post("/place/update/:placeId", async (req, res) => {
  const { name,placeType,lat,lng} = req.body
  const { placeId } = req.params
  const location = {
    type: "Point",
    coordinates: [lng, lat]
  }
  await Place.findByIdAndUpdate(placeId, { name,placeType})
  res.redirect(`/private-page`)
})

router.get("/place/delete/:placeId", async (req, res) => {
  const { placeId } = req.params
  await Place.findByIdAndDelete(placeId)
  res.redirect("/private-page")
})

//======================= CREATE AND UPDATE WITH LOCATION=======================
router.get("/place/create", newPlaceForm)
router.post("/place/create", addNewPlace)
/*router.get("/place/edit/:placeId",editPlaceForm)
router.post("/place/update/:placeId",editPlace)*/
//router.get("/place/:placeId", detailPlaceView)

module.exports = router;
