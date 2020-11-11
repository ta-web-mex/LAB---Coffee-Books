const express = require('express');
const router  = express.Router();

const {
  loginView,
  logout,
  places,
  googleInit,
  googleCb,
  facebookInit,
  facebookCB
}=require("../controllers/auth")
const{isAuth,isNotAuth}=require("../middlewares")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//Auth
router.get("/login", isNotAuth,loginView)
router.get("/places",isAuth, places)

router.get("/logout", logout)

//Google
router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)

//Facebook
router.get("/auth/facebook",facebookInit)
router.get("/auth/facebook/callback", facebookCB)

module.exports = router;
