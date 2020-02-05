const router = require('express').Router()
const passport = require("../config/passport")

// const passport = require('../config/passport')
const {signupView, loginView, profileView, createEvent,logout, createEventPost, placeGet} = require('../controllers/authControllers')



router.get('/signup', signupView)
router.get('/login', loginView)
router.get('/privates/profile', profileView )
router.get('/privates/createEvent',createEvent )
// router.post('/signup', signupPost)

// Google auth Routes
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/privates/profile",
    failureRedirect: "/login"
  })
);

router.get("/logout", logout);
router.post('/privates/createEvent',createEventPost)
router.get('/place/:id', placeGet)
module.exports = router;