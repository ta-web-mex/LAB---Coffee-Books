const router = require("express").Router();
const passport = require("passport");



//Facebook
router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebookCallback", passport.authenticate("facebook", {
    successRedirect: "/user/create",
    failureRedirect: "/login"
}
    ));

//Google
router.get("/google", passport.authenticate("google",{
    scope: ["profile"]
}))

router.get("/googleCallback", passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

// //Logout
router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
  });

router.post("/:id/delete", (req, res) => {
  console.log("hola")
  const {id} = req.params
  console.log(id)
  Place.findByIdAndDelete(id)
      .then(() => res.redirect("/"))
      .catch(err => console.log(err))
})

module.exports = router;