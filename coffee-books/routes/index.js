const express = require('express');
const router  = express.Router();

const {
  loginView,
  logout,
  places,
  googleInit,
  googleCb,
  facebookInit,
  facebookCB,
  feeds
}=require("../controllers/auth")

const{isAuth,isNotAuth}=require("../middlewares")

const {
  newPlaceForm,
  addNewPlace,
  detailPlace,
  editPlace,
  updatePlace,
  deletePlace
}=require("../controllers/places")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//Auth
router.get("/login", isNotAuth,loginView)
router.get("/places",isAuth, places)
router.get("/feeds", isNotAuth, feeds)

router.get("/logout", logout)

//Google
router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)

//Facebook
router.get("/auth/facebook",facebookInit)
router.get("/auth/facebook/callback", facebookCB)

//CRUD Places
router.get("/places/create", isAuth, newPlaceForm)
router.post("/places/create", isAuth, addNewPlace)

router.get("/places/:placeId", isAuth, detailPlace)
router.get("/places/edit/:placeId", isAuth, editPlace)
router.post("/places/update/:placeId", isAuth, updatePlace)
router.get("/places/delete/:placeId", isAuth, deletePlace)



module.exports = router;
