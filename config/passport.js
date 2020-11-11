const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User')

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'email','name']
},
async (accessToken, refreshToken, profile, done) => {
  const res = profile._json
  const user = await User.findOne({ facebookId: res.id })

  if(user) {
    return done(null, user)
  }

  const newUser = await User.create({
    facebookId: res.id,
    name: res.first_name + " " + res.last_name,
    email: res.email
  })

  done(null, newUser)
}
))

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (_, __, profile, done) => {
      const user = await User.findOne({ googleId: profile.id })

      if (user) {
        return done(null, user)
      }

      const newUser = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      })

      done(null, newUser)
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id)
  user.password = null
  cb(null, user)
})

module.exports = passport