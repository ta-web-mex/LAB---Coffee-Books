const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const FacebookStrategy = require("passport-facebook").Strategy;
//google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (acessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = await User.findOne({ googleID: profile.id });
      if (!user) {
        const newUser = await User.create({
          googleID: profile.id,
          name: profile.displayName || profile.emails[0].value,
          email: profile.emails[0].value,
        });
        done(null, newUser);
      }
      done(null, user);
    }
  )
);
//facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "email", "gender", "link", "name", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = await User.findOne({ facebookID: profile.id });
      if (!user) {
        const newUser = await User.create({
          facebookID: profile.id,
          name: profile.emails[0].value,
          email: profile.emails[0].value,
        });
        done(null, newUser);
      }
      done(null, user);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    delete user.password;
    done(null, user);
  } catch (error) {
    done(error);
  }
});
module.exports = passport;
