const express = require('express');
const router  = express.Router();

//login
const{
  loginView,
  facebookProcess,
  facebookRedirect,
  signupView,
  signupProcess,
  loginProcess,
  googleProcess,
  googleRedirect,
} = require("../control/auth")

//middleware
const { 
  enssureLogin,
 } = require("../middleware/index")

//places
const {
  getPlaces,
  getPlace,
  createView,
  createProcess,
  deleteProcess,
  editView,
  editProcess
} = require("../control/places")

/* GET home page */
router.get('/', (req, res) => {
  res.render('index');
});

//signup
router.get("/signup", signupView)
router.post("/signup", signupProcess)


//login
router.get("/login", enssureLogin("/login"), loginView)
router.post("/login", enssureLogin("/login"), loginProcess)


// //facebook
router.get("/auth/facebook", facebookProcess)
router.get("/auth/facebook/callback", facebookRedirect)

//google
router.get("/auth/google", googleProcess)
router.get("/auth/google/callback", googleRedirect)

//private
router.get("/private", enssureLogin("/login"), (req, res)=>{
  res.render("private", {user : req.user})
})

//places
router.get("/places/home", enssureLogin("/login"), getPlaces)

//place detail
router.get("/places/detail/:placeId", enssureLogin("/login"), getPlace)

//add new
router.get("/places/create", enssureLogin("/login"),createView )
router.post("/places/create",enssureLogin("/login"), createProcess)

//editar
router.get("/places/editar/:placeId",enssureLogin("/login"), editView)
router.post("/places/editar/:placeId",enssureLogin("/login"), editProcess)

//delete
router.post("/places/detail", deleteProcess)

module.exports = router;
