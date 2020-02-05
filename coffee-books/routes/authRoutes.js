const { Router } = require("express");
const passport = require("../config/passport");
const router = Router();
const{
    // signupView,
    // signup,
    login,
    logout
} = require('../controllers/authControllers')

// router.get('/signup', signupView)
// router.post('/signup', signup)


    //Google auth Routes

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
    );

    
      router.get("/logout", logout);

      module.exports = router