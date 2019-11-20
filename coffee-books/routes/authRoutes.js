const router = require("express").Router();
const passport = require("passport");
const { callbackRedirect, logout } = require("../controllers/auth.controller");

router.get("/login", passport.authenticate("facebook"));
router.get("/callback", passport.authenticate("facebook"), callbackRedirect);
router.get("/logout", logout);


router.get('/google',
  passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

router.get( '/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/user/create',
        failureRedirect: '/google/callback'
}));


module.exports = router;