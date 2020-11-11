const bcrypt = require("bcrypt")
const User = require("../models/User")
const passport = require("../configs/passport")


exports.signUpPage = (req,res) => res.render('auth/signup')


exports.signUpProcess = async (req,res) => {
  //1. get info from form
  const {email, password} = req.body

  //2. check no empty form
  if (email ==="" || password==="") {
    return res.render('auth/signup', {error: "Please enter email and password"})
  }

  //3. check that a user with the same email does not already exist
  const user = await User.findOne({email})
  if (user) {
    return res.render('auth/signup', {error: "Try again"})
  }

  //4. If the user does not already exist, create a hash from password
  const salt = bcrypt.genSaltSync(12)
  const hashPass = bcrypt.hashSync(password, salt)
  
  //5. add user to database
  await User.create({
    email,
    password: hashPass
  })
  
  //6. Redirect to login after sign up
  res. redirect("/login")
}


exports.loginPage = (req,res) => {
  res.render('auth/login', {error: req.flash("error")})
}


exports.loginProcess = passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
})


exports.logoutProcess = (req,res) => {
  req.logout()
  res.redirect("/")
}


exports.googleInit = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
})


exports.googleCb = passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login"
})