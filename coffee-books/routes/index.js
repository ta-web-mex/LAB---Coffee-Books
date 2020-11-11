const express = require('express');
const router  = express.Router();
const passport = require('passport')
const { isAuth, isNotAuth } = require("../middlewares")
const { signupProcess, signupView, googleInit, googleCb, loginProcess, loginView } = require('../controllers/auth');
const User = require('../models/User');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index")
})

//------Signup

router.get('/signup', isNotAuth, signupView)
router.post('/signup', isNotAuth, signupProcess)

//-------Login

router.get('/login', (req, res) => {
  res.render('../views/auth/login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}))


// router.get("/login", isNotAuth, loginView)
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/profile',
//   failureRedirect: '/login'
// }))

// router.post("/login", isNotAuth, loginProcess)

//-------Google Signup

router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)

//-------Profile

router.get('/profile', (req, res) => {
  res.render('profile')
})


module.exports = router;
