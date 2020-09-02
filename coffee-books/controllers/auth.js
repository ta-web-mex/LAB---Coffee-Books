const User = require("../models/User")
const { hashSync, genSaltSync } = require("bcrypt")
const passport = require("../config/passport")


exports.signupView = (req, res) => {
    res.render("/")
  }
  exports.signupProcess = async (req, res) => {
    const { name, email, password} = req.body
  
    if (name === "" || email === "" || password === "") {
      return res.render("/", { error: "Missing fields." })
    }
  
    const existingUser = await User.findOne({ email })
    console.log(req.body, existingUser)
    if (existingUser) {
      return res.render("/", { error: "Error, try again." })
    }
    const hashPwd = hashSync(password, genSaltSync(12))
    await User.create({
      name,
      email,
      password: hashPwd
    })
    res.redirect("/login")
  }
  
  exports.loginView = (req, res) => {
    res.render("login", { error: req.flash("error") })
  }
  exports.loginProcess = passport.authenticate("local", {
    successRedirect: "private",
    failureRedirect: "login",
    failureFlash: true
  })
  
  exports.private = (req, res) => {
    res.render("private", req.user)
  }
  
  exports.logout = (req, res) => {
    req.logout()
    res.redirect("/login")
  }

  exports.feeds = (req,res) => {
      res.render("feeds")
  }
  

//=================GOOGLE===========
  exports.googleProcess = passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
  exports.googleRedirect = passport.authenticate("google", {
    successRedirect: "/private",
    failureRedirect: "/" // here you would redirect to the login page using traditional login approach
  }) 

  //=================FACEBOOK===========

  exports.facebookProcess = passport.authenticate("facebook", {
    scope: ["email"]
  })
  exports.facebookRedirect = passport.authenticate("facebook", {
    successRedirect: "/private",
    failureRedirect: "/"
  })
  