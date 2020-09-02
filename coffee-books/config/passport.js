const passport = require('passport')
const {
    Strategy: LocalStrategy
} = require('passport-local')
const {
    Strategy: FacebookStrategy
} = require('passport-facebook')
const {
    Strategy: GoogleStrategy
} = require('passport-google-oauth20')
const {
    compareSync
} = require('bcryptjs')
const User = require('../models/User')
const app = require('../app')

// Local strategy
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async(email, password, done) => {
    try {
        const user = await User.findOne({
            email
        })
        if (!user) return done(null, false, {
            message: "Invalid username"
        })
        if (!user.password) return done(null, false, {
            message: "Your account doesn't have a password associated. Try logging in with Facebook or Google."
        })
        if (user.password && !compareSync(password, user.password)) return done(null, false, {
            message: "Incorrect password"
        })
        done(null, user)
    } catch (err) {
        console.log(err)
        done(err)
    }
}))

// Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "/auth/google/callback"
}, async(accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({
        googleID: profile.id
    })
    const userWithEmail = await User.findOne({
        email: profile.emails[0].value
    })
    if (!user && userWithEmail) return done(null, false, {
        message: "There is another account with this email"
    })
    if (!user && !userWithEmail) {
        const user = await User.create({
            email: profile.emails[0].value,
            googleID: profile.id,
        })
        done(null, user)
    }
    done(null, user)
}))

// Facebook strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ["id", "email", "name"]
}, async(accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({
        facebookID: profile.id
    })
    const userWithEmail = await User.findOne({
        email: profile.emails[0].value
    })
    if (!user && userWithEmail) return done(null, false, {
        message: "There is another account with this email"
    })
    if (!user && !userWithEmail) {
        const user = await User.create({
            facebookID: profile.id,
            email: profile.emails[0].value,
            name: profile.name.giveName
        })
        done(null, user)
    }
    done(null, user)
}))


passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id)
        delete user.password
        done(null, user)
    } catch (err) {
        done(err)
    }
})

module.exports = passport;