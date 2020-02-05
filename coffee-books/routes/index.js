const express = require('express');
const router  = express.Router();
const passport = require('passport');
const {signUpGet, loginGet, signUpPost} = require('../controllers/authControllers')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', signUpGet);
router.post('/signup', signUpPost);
router.get('/login', loginGet);

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
    successRedirect: "/places",
    failureRedirect: "/login"
  })
);

module.exports = router;
