const { Router } = require('express')
const passport = require('../config/passport')
const router = Router() 

const {
  loginView,
  signupView,
  signupPost,
  logOut
} = require('../controllers/auth.controller')

router.get('/login', loginView)

router.post('/signup', signupPost)

router.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/places',
    failureRedirect: '/login',
    failureFlash: true
  })
)
router.get('/signup', signupView)
router.get('/logout', logOut)

router.get('/auth/facebook', passport.authenticate('facebook'))
router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { 
    successRedirect: '/',
    failureRedirect: "/login"
  })
)

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
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

module.exports = router