const User = require("../models/User")
const { hashSync, genSaltSync } = require('bcrypt')
const passport = require("../config/passport")

exports.signupView = (req, res) => res.render("auth/signup")

exports.signupProcess = async(req, res) => {
    const { email, password } = req.body

    if (email === "" || password === "") {
        return res.render("auth/signup", { error: "Missing fields." })
    }

    const existingUser = await User.findOne({ email })
        //console.log(req.body, existingUser)
    if (existingUser) {
        return res.render("auth/signup", { error: "Error, try again." })
    }
    const hashPwd = hashSync(password, genSaltSync(12))
    await User.create({
        email,
        password: hashPwd
    })
    res.redirect("/login")
}

exports.loginView = (req, res) => {
    res.render("auth/login", { error: "Error" })
}

exports.loginProcess = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
})

exports.googleProcess = passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
})
exports.googleRedirect = passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
})

exports.facebookProcess = passport.authenticate("facebook", {
    scope: ["email"]
})

exports.facebookRedirect = passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login"
})

exports.logout = (req, res) => {
    req.logout()
    res.redirect("/login")
}