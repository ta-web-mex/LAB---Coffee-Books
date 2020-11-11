const passport = require('passport');
const User = require('../models/User.model');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
  async (_accessToken, _refreshToken, profile, done) => {
    console.log(profile);
    const user = await User.find({ facebookId: profile.id }, console.log('cb', profile));
    console.log('profile', profile);
    // if (user) return done(null, user);

    // const newUser = await User.create({
    //   user: profile.user,
    //   email: profile.email,
    //   facebookId: profile.id,
    // })
    //return done(null, user);
  }));

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback'
  },
    async (_accessToken, _refreshToken, profile, done) => {
      const user = await User.findOne({ googleID: profile.id });
      if (user) return done(null, user);
      const newUser = await User.create({
        googleID: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      });
      return done(null, newUser);
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser(async (_id, done) => {
  const user = await User.findById(_id)
  return done(null, user)
})

module.exports = passport;