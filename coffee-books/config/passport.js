
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/User")

//google

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback"
      },
      async (_, __, profile, done) => {
        const user = await User.findOne({ googleID: profile.id })
        if (user) {
          return done(null, user)
        }
        const newUser = await User.create({
          googleID: profile.id,
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
    cb(null, user) // Guarda lo que le enviamos como segundo argumento en la sesion como req.user
  })
  
  module.exports = passport
  