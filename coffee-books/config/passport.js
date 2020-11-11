const passport = require('passport')
const GoogleStrategy=require("passport-google-oauth20").Strategy
const FacebookStrategy=require("passport-facebook").Strategy
const User=require("../models/User.model")

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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL:"/auth/facebook/callback"
  },
  async (_,__, profile, done)=>{
    const user = await User.findOne({ facebookID: profile.id })
    if (user) {
      return done(null, user)
    }
    const newUser = await User.create({
      facebookID: profile.id,
      email: profile.emails[0].value
    })
    done(null, newUser)
  })
)

passport.serializeUser((user,cb)=>{
    cb(null, user._id)
})

passport.deserializeUser(async(id,cb)=>{
    const user=await User.findById(id)
    //user.password=null
    cb(null, user)
})


module.exports=passport




