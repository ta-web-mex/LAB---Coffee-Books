const express = require('express');
const router  = express.Router();
const {
  signupView,
  signupProcess,
  loginView,
  loginProcess,
  privatePage,
  logout,
  facebookInit,
  facebookCb,
  googleInit,
  googleCb
} = require("../controllers/auth")
//middlewares
const { isAuth, isNotAuth, checkRoles } = require("../middlewares")

//===========Authorization==============
router.get("/signup", isNotAuth, signupView)
router.post("/signup", isNotAuth, signupProcess)
router.get("/login", isNotAuth, loginView)

//============middleware================
router.post("/login", isNotAuth, loginProcess)
router.get("/private-page", isAuth, privatePage)
router.get("/logout", logout)

//============SOCIAL=====================
router.get("/auth/facebook", facebookInit)
router.get("/auth/facebook/callback", facebookCb)

router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
