const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const User = require("../models/User")

passport.use(
    new LocalStrategy({
            usernameField: "username",
            passwordField: "password"
        },
        async(username, password, done) => {
            const user = await User.findOne({ username })
            if (!user) {
                return done(null, false, { message: "Incorrect username" })
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: "Incorrect password" })
            }

            done(null, user)
        }
    )
)

passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async(_, __, profile, done) => {
            const user = await User.findOne({ googleID: profile.id })

            if (user) {
                return done(null, user)
            }

            const newUser = await User.create({
                googleID: profile.id,
                // username: profile.emails[0].value
            })

            done(null, newUser)
        }
    )
)

passport.use(
    new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "/auth/facebook/callback"
        },
        async(_, __, profile, done) => {
            const user = await User.findOne({ facebookId: profile.id })
            if (user) {
                return done(null, user)
            }

            const newUser = await User.create({
                facebookID: profile.id,
                // username: profile.emails[0].value
            })

            done(null, newUser)
        }
    ));

passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser(async(id, cb) => {
    try {
        const user = await User.findById(id)
        if (user) {
            user.password = null
        }
        cb(null, user)
    } catch (err) {
        console.log(err)
    }
})

module.exports = passport