const User = require("../models/User");
const passport = require("../config/passport");
const { hashSync, genSaltSync } = require("bcrypt")

exports.loginView = (req, res) => {
  res.render("login")
}

//signup normal
exports.signupView = (req,res)=>{
  res.render("signup")
}

exports.signupProcess = async(req, res)=>{
  const {name, email, password} = req.body;
  if(name==="" || email==="" || password===""){
    res.render("auth/signup", {error : "Te faltan los datos!!"})
  }
  const existingUser = await User.findOne({email})
  if(existingUser){
    return res.render("auth/signup", {error : "Username o email ya esta en uso"})
  }
  const hashPass = hashSync (password, genSaltSync(12))
  await User.create({
    name,
    email,
    password : hashPass
  })
  res.redirect("/login")
}


//login normal
exports.loginView = (req, res) =>{
  res.render("login")
}

exports.loginProcess = passport.authenticate("local", {
  successRedirect: "/private",
  failureRedirect: "/",
})



// facebook login
exports.facebookProcess = passport.authenticate("facebook", {
  scope: ["email"]
})
exports.facebookRedirect = passport.authenticate("facebook", {
  successRedirect: "/private",
  failureRedirect: "/"
})

//google login
exports.googleProcess = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
})
exports.googleRedirect = passport.authenticate("google", {
  successRedirect: "/private",
  failureRedirect: "/" 
})
