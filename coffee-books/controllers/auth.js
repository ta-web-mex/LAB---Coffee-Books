const bcrypt = require("bcrypt")
const User = require("../models/User")
const passport = require("../config/passport")

exports.signUpView = (req, res) => res.render("auth/signup")

exports.signupMethod = async(req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.render("auth/signup", {
            errorMessage: "Indicate username and password"
        })
    }
    const user = await User.findOne({ username })
    if (user) {
        return res.render("auth/signup", {
            errorMessage: "Error"
        })
    }
    const salt = bcrypt.genSaltSync(12)
    const hashPass = bcrypt.hashSync(password, salt)
    await User.create({
        username,
        password: hashPass
    })

    res.redirect("/login")
}

exports.loginView = (req, res) => res.render("auth/login")

exports.loginMethod = passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login"
})

exports.logoutView = (req, res) => {
    req.logout()
    res.redirect("/")
}

exports.googleInit = passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
})

exports.googleCb = passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/login"
})

exports.facebookInit = passport.authenticate('facebook')

exports.facebookCb = passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login"
})