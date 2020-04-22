require('dotenv').config()

const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User')

//Facebook Strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'email', 'name'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile)
      const user = await User.findOne({ facebookID: profile.id })
      if (!user) {
        const newUser = await User.create({
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          facebookID: profile.id,
          email: profile.emails[0].value,
        })
        return cb(null, newUser)
      } else {
        cb(null, user)
      }
      // User.findOrCreate(..., function(err, user) {
      //   if (err) { return done(err); }
      //   done(null, user);
      // });
    }
  )
)

//Google Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/profile',
      profileFields: ['id', 'email', 'name'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      if (!user) {
        const newUser = await User.create({
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          googleID: profile.id,
          email: profile.emails[0].value,
        })
        return cb(null, newUser)
      } else {
        cb(null, user)
      }

      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
)

//Local Strategy
passport.use(User.createStrategy())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

module.exports = passport
