const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
// const FacebookStrategy = strategy.Strategy
const User = require('../models/User')


//-------Local Strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      emailField: 'email',
      passwordField: 'password'
    },
    async (username, email, password, done) => {
      const user = await User.findOne({ username })
      if (!user) {
        return done(null, false, { message: "Incorrect username"})
      }
      const user2 = await User.findOne({ email })
      if (!user2) {
        return done(null, false, { message: "Incorrect email"})
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect password"})
      }
      done(null, user) 
    }
  )
)

//-------Google Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: '830045800280-h9t5q0d4fs2ptptnimgg1dljqgoj74ts.apps.googleusercontent.com',
      clientSecret: 'plAGpYZoh76tTy-Cl0iRq7Ol',
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleID: profile.id })

      if(user) {
        return done(null, user)
      }

      const newUSer = await User.create({
        googleID: profile.id,
        email: profile.emails[0].value
      })

      done(null, newUSer)
    }
  )
)

//-------Facebook Strategy

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: '427518731979822',
//       clientSecret
//     }
//   )
// )


// FB.getLoginStatus(function(response) {
//   statusChangeCallback(response);
// });

//-------

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id)
  user.password = null
  cb(null, user)
})


module.exports = passport