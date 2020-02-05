const router = require('express').Router()
const passport = require('passport')
const {signupView, signup, loginView, logout} = require('../controllers/authController')

router.get('/signup', signupView) // no estoy segura si esto es de local o lo necesito para lo de google
router.post('/signup', signup)

router.get('/login', loginView)

router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
)

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/showall", //muestra crud view en showall y para editar y crear lugares.
    failureRedirect: "/login"
  })
)

router.get('/logout', logout)