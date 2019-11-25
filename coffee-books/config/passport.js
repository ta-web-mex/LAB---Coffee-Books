require("dotenv").config();

const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(User.createStrategy());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const [emailObj] = profile.emails;
      const name = `${profile.name.givenName} ${profile.name.familyName}`;
      const user = await User.findOne({ googleId });
      if (!user) {
        const newUser = await User.create({
          name,
          email: emailObj.value,
          googleId
        });
        return done(null, newUser);
      }
      return done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/facebook/callback",
      profileFields: ["id", "emails", "name"]
    },
    async (accessToken, refreshToken, profile, done) => {
      const facebookId = profile.id;
      const [emailObj] = profile.emails;
      const name = `${profile.name.givenName} ${profile.name.familyName}`;
      const user = await User.findOne({ facebookId });
      if (!user) {
        const newUser = await User.create({
          name,
          email: emailObj.value,
          facebookId
        });
        return done(null, newUser);
      }
      return done(null, user);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;