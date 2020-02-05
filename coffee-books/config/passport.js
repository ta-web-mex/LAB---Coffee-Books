const passport = require('passport')
const User = require("../models/User");
const googleStrategy = require("passport-google-oauth20").Strategy

passport.use(User.createStrategy());

passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (_, __, profile, done) => {
      console.log("profile:", profile);
      const user = await User.findOne({ googleID: profile.id });
      if (user) {
        //user.image = profile._json.picture;
        await user.save();
        return done(null, user);
      }
      const newUser = await User.create({
        googleID: profile.id,
        name: profile.displayName,
        email: profile._json.email,
        //image: profile._json.picture
        place: profile._json.place
      });
      done(null, newUser);
    }
  )
);


module.exports = passport;