const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const { compareSync } = require("bcrypt")
const User = require("../models/User")

//#region Estrategia Local

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password" //  Por defecto toma esta propiedad y podemos prescindir de esta linea
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email })

          if (!user) return done(null, false, { message: "incorrect username" })

          if (!compareSync(password, user.password))
            return done(null, false, { message: "Incorrect password" })

          done(null, user)

        } catch (error) {

          console.error(error)
          done(error)
        }
      }
    )
  )

  //#endregion
  
//#region Google Strategy

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        //console.log("PROFILE: ", profile)
        const user = await User.findOne({ googleID: profile.id })
        if (!user) {
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

//#endregion
  
//#region Facebook Strategy

passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ["id", "email", "gender", "link", "name", "photos"]
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        const user = await User.findOne({
          facebookID: profile.id
        })
        if (!user) {
          const user = await User.create({
            facebookID: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName || 
            `${profile.name.givenName || ""} ${profile.name.middleName || "" } ${profile.name.familyName || ""}`
          })
          done(null, user)
        }
        done(null, user)
      }
    )
  )

//#endregion

//#region Serializer y Deserializer

passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  
passport.deserializeUser(async (id, done) => {
    try 
    {
        const user = await User.findById(id, {'password': 0})
        //console.log(user)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

//#endregion

module.exports = passport