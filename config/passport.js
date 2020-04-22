// Environment variables
require('dotenv').config();
// Model Schema
const User = require('../models/User');
// Requiere dependencies
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/loginFacebook/callback',
      profileFields: ['id', 'email'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({ facebookId: profile.id })
      if (!user) {
        const userCreated = await User.create({
          email: profile.emails[0].value,
          facebookId: profile.id,
        });
        return cb(null, userCreated);
      } else {
        return cb(null, user);
      }
    }
  )
);

// Local Strategy
passport.use(User.createStrategy());

//serializing
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
