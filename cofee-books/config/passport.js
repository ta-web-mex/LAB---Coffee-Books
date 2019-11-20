require("dotenv").config();

const passport = require("passport");
const User = require("../models/User");
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_KEY,
      clientSecret: process.env.FB_SECRET,
      callbackURL: "http://localhost:3000/facebook/callback",
      profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        const newUser = await User.create({
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.email
        });
        return cb(null, newUser);
      } else {
        return cb(null, user);
      }
    }
  )
);
/*
passport.use(
  new GoogleStrategy(
  {
  consumerKey: GOOGLE_CONSUMER_KEY,
  consumerSecret: GOOGLE_CONSUMER_SECRET,
  callbackURL: "localhost:3000/auth/google/callback"
},
async (token, tokenSecret, profile, done) => {
    const user = await User.findOne({ googleId: profile.id });
      if (!user){
      const newUser = await User.create({
        googleId: profile.id,
        name: profile.name,
        email: profile.client_email
      });
      return done(null, newUser);
    } else {
      return done(null, user);
    }
   }
));
*/


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;