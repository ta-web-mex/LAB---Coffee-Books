const express = require('express');
const router  = express.Router();
// const User = require('../models/User')
// const bcrypt = require("bcrypt")
// const passport = require("../configs/passport")
// const ensureLogin = require("connect-ensure-login")
// const flash = require("connect-flash")

const {
  signUpPage, 
  signUpProcess, 
  loginPage, 
  loginProcess, 
  logoutProcess,
  googleCb, 
  googleInit
} = require("../controllers/auth");

const { isAuth, isNotAuth } = require('../middlewares');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { user: req.user })
})

router.get('/signup', isNotAuth, signUpPage)
router.post('/signup', isNotAuth, signUpProcess)
router.get('/login', isNotAuth, loginPage)
router.post('/login', isNotAuth, loginProcess)
router.get('/logout', isAuth, logoutProcess)

router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)

// router.get('/signup', async (req, res) => {
//   res.render('auth/signup')
// })

// router.post('/signup', async (req, res) => {
  
//   //1. get info from form
//   const {email, password} = req.body

//   //2. check no empty form
//   if (email ==="" || password==="") {
//     return res.render('auth/signup', {error: "Please enter email and password"})
//   }

//   //3. check that a user with the same email does not already exist
//   const user = await User.findOne({email})
//   if (user) {
//     return res.render('auth/signup', {error: "Try again"})
//   }

//   //4. If the user does not already exist, create a hash from password
//   const salt = bcrypt.genSaltSync(12)
//   const hashPass = bcrypt.hashSync(password, salt)
  
//   //5. add user to database
//   await User.create({
//     email,
//     password: hashPass
//   })
  
//   //6. Redirect to login after sign up
//   res. redirect("/login")
// })

// router.get('/login', async (req, res) => {
//   res.render('auth/login', {error: req.flash("error")})
// })

// router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
//   res.render('index', { user: req.user })
// })

// router.post('/login', passport.authenticate("local", {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }))


module.exports = router;

