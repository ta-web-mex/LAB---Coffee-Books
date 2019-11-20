const router = require("express").Router();
const passport = require("passport");



//Facebook
router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebookCallback", passport.authenticate("facebook", {
    successRedirect: "/create",
    failureRedirect: "/login"
}
    ));

//Google
router.get("/google", passport.authenticate("google",{
    scope: ["profile"]
}))

router.get("/googleCallback", passport.authenticate("google", {
    successRedirect: "/create",
    failureRedirect: "/login"
}));

// //Logout
router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
  });



module.exports = router;