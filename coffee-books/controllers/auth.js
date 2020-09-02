const User = require("../models/User")
const { hashSync, genSaltSync } = require("bcrypt")
const passport = require("../config/passport")

//#region Sign up

exports.signUpView = (req, res) => {
    res.render("auth/signup")
}

exports.signUpProcess = async (req, res) => {    
  const { name, email, password } = req.body

  if (name==="" || email === "" || password === "") {
    return res.render("auth/signup", { error: "Missing fields." })
  }

  const existingUser = await User.findOne({ email })
  
  if (existingUser) {
    return res.render("auth/signup", { error: "Error, try again." })
  }

  const hashPwd = hashSync(password, genSaltSync(12))

  await User.create({
    name,
    email,
    password: hashPwd
  })

  res.redirect("/auth/login")
}

//#endregion

//#region Login -Local-

exports.loginView = (req, res) => {
    //Detalle de como usar el connect-flash para regresar errores de las strategy
    res.render("auth/login", {
      error: req.flash("error"),
  })
}

exports.loginProcess = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true
})

exports.logoutProcess = (req, res) => {
    req.logout()
    res.redirect("/")
  }

//#endregion Login -Local-

//#region Google Auth

exports.googleProcess = passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })


exports.googleRedirect = passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/login", // here you would redirect to the login page using traditional login approach
    failureFlash: true
})

//#endregion

//#region Facebook Auth

exports.facebookProcess = passport.authenticate("facebook", {
    scope: ["email"]
  })
  exports.facebookRedirect = passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true
  })

//#endregion