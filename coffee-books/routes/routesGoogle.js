const { Router } = require('express')
const router = Router()

const passport = require('../config/passport')

const { logout } = require('../controllers/authControllers')

router
  .get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  )
  .get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/login"
    })
  )
  .get('/logout', logout)

  module.exports = router