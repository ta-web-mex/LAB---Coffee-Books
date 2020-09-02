require("dotenv").config();

const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(User.createStrategy());

passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log("PROFILE: ", profile)
            const user = await User.findOne({ googleID: profile.id })
            if (!user) {
                const user = await User.create({
                    email: profile.emails[0].value,
                    googleID: profile.id,
                    photo: profile.photos[0].value
                })
                done(null, user)
            }
            done(null, user)
        }
    )
)
passport.use(
    new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: "http://localhost:3000/facebook/callback",
            profileFields: ["id", "emails", "name"]
        },
        async(accessToken, refreshToken, profile, done) => {
            const facebookId = profile.id;
            const [emailObj] = profile.emails;
            const name = `${profile.name.givenName} ${profile.name.familyName}`;
            const user = await User.findOne({ facebookId });
            if (!user) {
                const newUser = await User.create({
                    name,
                    email: emailObj.value,
                    facebookId
                });
                return done(null, newUser);
            }
            return done(null, user);
        }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;