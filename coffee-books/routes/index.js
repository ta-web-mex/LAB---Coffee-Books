const express = require('express');
const router  = express.Router();
const {
  signupView,
  signupProcess,
  loginView,
  loginProcess,
  privatePage,
  logout,
  googleInit, 
  googleCb
} = require('../controllers/auth')
const { isAuth, isNotAuth } = require("../middlewares");
const {
  newPlaceForm,
  addNewPlace,
  detailPlaceView
} = require("../controllers/places");
const Place = require("../models/Place")
const { catchErrors } = require("../middlewares/index")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//AUTH//
 
router.get("/signup", isNotAuth, signupView)
router.post("/signup", isNotAuth, signupProcess)
router.get("/login", isNotAuth, loginView)



router.get("/logout", logout)

//SOCIAL//
router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)




/* GET home page */
router.get("/", async (req, res, next) => {
  const places = await Place.find()
  res.render("index", { token: process.env.MAPBOX_TOKEN, places })
})

router.get("/place/add", newPlaceForm)
router.post("/place/add", catchErrors(addNewPlace))
router.get("/place/:placeId", catchErrors(detailPlaceView))


module.exports = router;
