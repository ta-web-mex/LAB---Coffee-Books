const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('../config/passport')


//-------Signup

exports.signupView = (req, res) => res.render('auth/signup')

exports.signupProcess = async (res, req) => {
  const { username, email, password } = req.body
  if (!email || !password || !username) {
    return res.render('../views/auth/signup', {
      errorMessage: "Some fields are missing"
    })
  }
  const user = await User.findOne({ username })
  if (user) {
    return res.render('../views/auth/signup', {
      errorMessage: 'That username is already in use'
    })
  }
  const salt = bcrypt.genSaltSync(12)
  const hashPass = bcrypt.hashSync(password, salt)
  await User.create({
    username,
    email,
    password: hashPass
  })
  res.redirect('/login')
}

//-------Login

// exports.loginView = (req, res) => {
//   res.render("../views/auth/login", { errorMessage: req.flash("error") })
// }

// exports.loginProcess = passport.authenticate("local", {
//   successRedirect: "/profile",
//   failureRedirect: "/login",
//   failureFlash: true
// })

//-------Google

exports.googleInit = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
})

exports.googleCb = passport.authenticate("google", {
  successRedirect: "/profile",
  failureRedirect: "/login"
})

//-------Logout
exports.logout = (req, res) => {
  req.logout()
  res.redirect("/login")
}