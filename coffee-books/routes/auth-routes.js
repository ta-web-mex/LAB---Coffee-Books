const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');

const {
  isAuth
} = require('../middlewares/index')
 

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});
 
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
 
  if (!username || !password) {
    res.render('auth/signup', { errorMessage: 'Indicate username and password' });
    return;
  }
 
  User.findOne({ username })
    .then((user) => {
      if (user !== null) {
        res.render('auth/signup', { message: 'The username already exists' });
        return;
      }
       const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = new User({
        username,
        password: hashPass,
      });
 
      newUser
        .save()
        .then(() => res.redirect('/login'))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});
 
router.get('/login', (req, res, next) => {
    res.render('auth/login');
  });


  router.post('/login', passport.authenticate("local", {
    successRedirect: "/private",
    failureRedirect: "/login"
  }))
  
  router.get("/private", isAuth, (req, res) => {
    res.render("private", { user: req.user });
  })

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });  


  router.get("/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  );

  router.get("/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/private",
      failureRedirect: "/"  
    })
  );


router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
    successRedirect: '/',
    failureRedirect: '/login' 
  })
  );

module.exports = router;
