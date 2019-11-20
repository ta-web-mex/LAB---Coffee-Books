require("dotenv").config();

const passport = require("passport");
const User = require("../models/User");
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.use(
  new FacebookStrategy({
      clientID: process.env.FACEBOOKID,
      clientSecret: process.env.FACEBOOKSECRET,
      callbackURL: "http://localhost:3000/facebook/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({
        facebookId: profile.id
      });
      if (!user) {
        console.log('no hay')
        const newUser = await User.create({
          facebookId: profile.id,
          name: profile.displayName,

        });
        return cb(null, newUser);
      } else {


        console.log('si hay')

        return cb(null, user);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/google/callback",
  passReqToCallback: true
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));


module.exports = passport;