const User = require('../models/User')
const passport = require('../config/passport')

exports.signupGet = (req, res) => {
  const config = {
    action: '/signup',
    title: 'Sign up',
    button: 'Create account',
    signup: true,
  }
  res.render('passport/signup', config)
}

exports.signupPost = (req, res) => {
  const { email, password, verify } = req.body
  const config = {
    action: '/signup',
    title: 'Sign up',
    button: 'Create account',
    signup: true,
    error: 'The passwords doesnt match',
  }
  if (password !== verify) {
    return res.render('passport/signup', config)
  } else {
    User.register({ email }, password)
      .then(() => res.redirect('/login'))
      .catch((err) => {
        config.error = err.message
        return res.render('passport/signup', config)
      })
  }
}

exports.loginGet = (req, res) => {
  const config = {
    action: '/login',
    title: 'Log in',
    button: 'Login',
    signup: false,
  }
  res.render('passport/login', config)
}

exports.loginPost = passport.authenticate('local', {
  successRedirect: '/place',
  failureRedirect: '/login',
})

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

exports.loginFacebook = passport.authenticate('facebook', { scope: ['email'] })

exports.loginFacebookCb = passport.authenticate('facebook', {
  successRedirect: '/place',
  failureRedirect: '/login',
  scope: ['email'],
})

exports.loginGoogle = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });

exports.loginGoogleCb = passport.authenticate('google', {
  failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/place');
}