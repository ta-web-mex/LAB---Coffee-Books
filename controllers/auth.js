const User = require('../models/User');
const passport = require('../config/passport');

// signup
exports.signupView = (req, res, next) => {
  res.render('auth/signup');
};
exports.signupPost = (req, res, next) => {
  const { email, password, verify } = req.body;
  password !== verify
    ? res.render('auth/signup', { err: "Passwords don't match" })
    : User.register({ email }, password)
        .then(() => res.redirect('/login'))
        .catch((err) => res.render('auth/signup', { err }));
};

// login
exports.loginView = (req, res, next) => {
  res.render('auth/login');
};
exports.loginPost = passport.authenticate('local', {
  successRedirect: '/yourPlaces',
  failureRedirect: '/login',
});

//login fb
exports.loginFB = passport.authenticate('facebook', { scope: ['email'] });
exports.loginFBCall = passport.authenticate('facebook', {
  successRedirect: '/yourPlaces',
  failureRedirect: '/login',
  scope: ['email'],
});


//login google
exports.loginG = passport.authenticate('facebook', { scope: ['email'] });
exports.loginGCall = passport.authenticate('facebook', {
  successRedirect: '/private',
  failureRedirect: '/login',
  scope: ['email'],
});

// logout
exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};
