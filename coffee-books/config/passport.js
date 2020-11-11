const bcrypt = require("bcrypt")
const passport = require("passport")
const User = require("../models/User")

const LocalStrategy= require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.use( new LocalStrategy(
    {
        nameField:"name",
        emailField: "email"
    },
    async (name, email, done)=>{
        //encontrar username iguales
        const user=await User.findOne({name})
        //si no se encuentra el usuario
        if(!user){
            return (null, false, {message: "Incorrect username"})
            
        }
        const emails=await User.findOne({email})
        //si no se encuentra el email
        if(!emails){

            return (null, false, {message: "Incorrect email"})
        }
        // si todo esta bien se manda a serializeUser
    //done guarda en la sesion lo que pasa
    //null se refiere a cuando no hay ningun error-- el primer argumento es para especificar un error
        done (null, user, emails)
        }
    )) 


    passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "/auth/google/callback"
          },
          async (_, __, profile, done) => {
              console.log(profile)
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
        new LocalStrategy(
          {
            usernameField: "email",
            passwordField: "password"
          },
          async (email, password, done) => {
            const user = await User.findOne({ email })
            if (!user) {
              return done(null, false, { message: "Incorrect email" })
            }
            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, { message: "Incorrect password" })
            }
      
            done(null, user) // envia el usuario a serializeUser
          }
        )
      )

    //   passport.use(new FacebookStrategy({
    //     clientID: FACEBOOK_APP_ID,
    //     clientSecret: FACEBOOK_APP_SECRET,
    //     callbackURL: "http://localhost:3000/auth/facebook/callback"
    //   },
    //   function(accessToken, refreshToken, profile, cb) {
    //     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //       return cb(err, user);
    //     });
    //   }
    // ));


//manda al user 
passport.serializeUser((user, cb)=>{
    cb(null, user._id)
})


passport.deserializeUser(async(id, cb)=>{
    const user =await User.findById(id)
    cb(null, user)
})

module.exports = passport