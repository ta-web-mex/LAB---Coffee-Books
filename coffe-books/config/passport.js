const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/User")

passport.use(
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        },
        async (email, password, done) => {
            const user = await User.findOne({
                email
            })
            if (!user) {
                return done(null, false, {
                    message: "Incorrect email"
                })
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {
                    message: "Incorrect password"
                })
            }

            done(null, user) 
        }
    )
)


passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://www.example.com/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate(... function (err, user) {
            if (err) {
                return done(err);
            }
            done(null, user);
        });
    }
));

// passport.use(new FacebookStrategy({
//         clientID: process.env.FACEBOOK_APP_ID,
//         clientSecret: process.env.FACEBOOK_APP_SECRET,
//         callbackURL: "http://www.example.com/auth/facebook/callback"
//     },
//     async (_, __, profile, done) => {
//         const user = await User.findOne({
//             googleID: profile.id
//         })

//         if (user) {
//             return done(null, user)
//         }

//         const newUser = await User.create({
//             googleID: profile.id,
//             email: profile.emails[0].value
//         })

//         done(null, newUser)
//     }
// ));


passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async (_, __, profile, done) => {
            const user = await User.findOne({
                googleID: profile.id
            })

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
    cb(null, user) 
})

module.exports = passport
