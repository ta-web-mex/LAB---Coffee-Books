const User = require("../models/User")
const { hashSync, genSaltSync} = require("bcrypt")
const passport = require("../config/passport")


//Signup

exports.signupView = (req, res) => { res.render("auth/signup") }

exports.signupProcess = async (req, res) => {
    const { name, email, password } = req.body
    if (name === "" || email === "" || password === "")
        return res.render("auth/signup", {error: "Por favor completa toda la información"})
    const existingUser = await User.findOne({ email })
    if (existingUser)
        return res.render("auth/signup", {error: "Email o contraseña incorrecta"})
    const hashPswd = hashSync(password, genSaltSync(12))
    await User.create({
        name,
        email,
        password: hashPswd
    })
    res.redirect("/login")
}

//Login

exports.loginView = (req, res) => { res.render ("auth/login")}

exports.loginProcess = passport.authenticate("local", {
    successRedirect: "/places",
    failureRedirect: "/login",
    failureFlash: true
})

// Google

exports.googleProcess = passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
})

exports.googleRedirect = passport.authenticate("google", {
    successRedirect: "/places",
    failureRedirect: "/login",
    failureFlash: true
})

// Facebook

exports.facebookProcess = passport.authenticate("facebook", {
    scope: ["email"]
})

exports.facebookRedirect = passport.authenticate("facebook", {
    successRedirect: "/places",
    failureRedirect: "/login",
    failureFlash: true
})