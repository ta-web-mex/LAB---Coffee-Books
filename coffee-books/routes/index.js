const express = require('express');
const router  = express.Router();
const passport = require("../config/passport")

const {signup, signUpView, login, loginView, logout} = require("../controllers/authControllers")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/signup',signUpView);
router.post('/signup',signup)
router.get("/login", loginView)

/*
router.get("/", (req, res, next)=> {
  res.redirect("/auth/facebook/callback")
})
*/


router.get('/auth/facebook', passport.authenticate('facebook'));
 router.get('/auth/facebook/callback',
   passport.authenticate('facebook', { successRedirect: '/',
  failureRedirect: '/login' }, ));


module.exports = router;
