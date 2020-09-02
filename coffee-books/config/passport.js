const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("PROFILE: ", profile)
      const user = await User.findOne({googleID: profile.id})
      if(!user){
        const user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleID: profile.id,
        })
        done(null, user)
      }
      done(null, user)
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    // const { email, role, photo } = await User.findById(id)
    const user = await User.findById(id)
    delete user.password
    // una vez ejecutamos done en el desszerialize esta informacio se almacena en la propiedad req.user
    // done(null, { email, role, photo })
    done(null, user)
  } catch (error) {
    done(error)
  }
})

module.exports = passport
