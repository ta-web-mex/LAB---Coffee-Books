const passport = require("passport")
const router = require("express").Router()
const {
  //signupView,
  //signup,
  //loginView,
  logout
} = require("../controllers/authControllers.js")

/*router.get("/signup", signupView)
router.post("/signup", signup)
router.get("/login", loginView)
router.post(
  "/login", 
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
)*/
router.get("/profile",(req,res)=> {
  res.render('profile')
})

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
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
)

router.get("/logout", logout)

module.exports = router;