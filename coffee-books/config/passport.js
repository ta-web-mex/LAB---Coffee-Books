const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/User")
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(
    {
      usernameField: 'username', 
      passwordField: 'password'  
    },
    (username, password, cb) => {
      User.findOne({username})
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Incorrect username" });
          }
   
          if (!bcrypt.compareSync(password, user.password)) {
            return cb(null, false, { message: "Incorrect password" });
          }
   
          cb(null, user);
        })
        .catch(err => cb(err))
      ;
    }
  ));


  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("Google account details:", profile);
   
        User.findOne({ googleID: profile.id })
          .then(user => {
            if (user) {
              done(null, user);
              return;
            }
   
            User.create({ googleID: profile.id })
              .then(newUser => {
                done(null, newUser);
              })
              .catch(err => done(err)); 
          })
          .catch(err => done(err)); 
      }
    )
  );


  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne(function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

passport.serializeUser((user, cb) => {
    cb(null, user._id)
  })
  
  passport.deserializeUser(async (id, cb) => {
    const user = await User.findById(id)
    user.password = null
    cb(null, user)
  })


module.exports = passport