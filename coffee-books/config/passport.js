//configurar estrategias FB y google

require("dotenv").config();

const passport = require("passport");
const User = require("../models/User");
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOKID,
//       clientSecret: process.env.FACEBOOKSECRET,
//       callbackURL: "http://localhost:3000/facebook/callback",
//       profileFields: ["id", "emails", "name"]
//     },
//     (accesToken, refreshToken, profile, done) => {
//         User.findOne({ facebookId: profile.id }).then(user => {
//             if(!user){
//                 User.create({
//                     facebookId: profile.id,
//                     name: profile.name["familyName"],
//                     email: profile.emails[0].value
//                 }).then (userCreated => done(null, user));
//             }else {
//                 done(null, user);
//             }
//         })
//     }
//   )
// );


passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOKID,
      clientSecret: process.env.FACEBOOKSECRET,
      callbackURL: "http://localhost:3000/facebook/callback",
      profileFields: ["id", "emails", "name"]
    },
    async (accesToken, refreshToken, profile, cb) => {
      const user = await User.findOne({facebookId: profile.id});
      if(!user){
        console.log(user);
        const newUser = await User.create({
          facebookId: profile.id,
          name: profile.name["familyName"],
          //name: profile.displayname
          // email: profile.emails[0].value
        });
        return cb(null, newUser)
      }else{
        return cb(null,user)
      }
    }
  )
);

/***GOOGLE */


passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback",
        profileFields: ["id", "emails", "name"]
      },
      async (accesToken, refreshToken, profile, cb) => {
        const user = await User.findOne({googleId: profile.id});
        if(!user){
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.name["familyName"],
            // email: profile.emails[0].value
          });
          return cb(null, newUser)
        }else{
          return cb(null,user)
        }
      }
    )
  );




//cambio a vanilla function
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;