const passport = require('../configs/passport');

module.exports = {
  facebookInit: passport.authenticate('facebook', {
    scope: ['user-id', 'email']
  }),

  facebookCb: passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
  }),

  googleInit: passport.authenticate('google', {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ]
  }),

  googleCb: passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
  }),

  login(_req, res) {
    res.render('login')
  },

  profile(req, res) {
    if (req.user) return res.render('profile', req.user);
    res.redirect('/');
  },

  signup(_req, res) {
    res.render('signup')
  },

  logout(req, res) {
    req.logout();
    res.redirect('/');
  }
};