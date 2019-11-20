require("dotenv").config();

const passport = require("passport");
const User = require("../models/User");
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy  = require("passport-google-oauth20")

// FACsEBOOK
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOKID,
      clientSecret: process.env.FACEBOOKSECRET,
      callbackURL: "http://localhost:3000/login/facebookCallback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        console.log(profile)
        const newUser = await User.create({
          facebookId: profile.id,
          name: profile.displayName
        });
        return cb(null, newUser);
      } else {
        return cb(null, user);
      }
    }
  )
);
// GOOGLE
passport.use(
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/googleCallback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({ googleId: profile.id });
    if (!user) {
      const newUser = await User.create({
        googleId: profile.id,
        name: profile.displayName
        });
      return cb(null, newUser);
    } else {
      return cb(null, user);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;