const User = require('../models/User')
const passport = require('../config/passport')

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

exports.facebookInit = passport.authenticate("facebook")

exports.facebookCb = passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/"
})

exports.googleInit = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
})

exports.googleCb = passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/"
})