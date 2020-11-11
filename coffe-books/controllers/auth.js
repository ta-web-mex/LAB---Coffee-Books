// Export individual
// {
// signupView: () => {}
//}
const bcrypt = require("bcrypt")
const User = require("../models/User")
const passport = require("../config/passport")

exports.signupView = (req, res) => res.render("auth/signupView")

exports.signupProcess = async (req, res) => {
    const {
        email,
        password
    } = req.body
    if (!email || !password) {
        return res.render("auth/signupView", {
            errorMessage: "Indicate email and password"
        })
    }
    const user = await User.findOne({
        email
    })
    if (user) {
        return res.render("auth/signupView", {
            errorMessage: "Error ✖"
        })
    }
    const salt = bcrypt.genSaltSync(12)
    const hashPass = bcrypt.hashSync(password, salt)
    await User.create({
        email,
        password: hashPass
    })
    res.redirect("/login")
}

exports.loginView = (req, res) => {
    res.render("auth/loginView", {

        errorMessage: req.flash("error")
    })
}


exports.googleInit = passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
})

exports.googleCallback = passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
})

exports.facebookInit = passport.authenticate('facebook', {
    scope: ['read_stream', 'publish_actions']
    
})

exports.facebookCallback = passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
})

exports.dashboardView = (req, res) => {
    res.render("auth/dashboard")
}

exports.logout = (req, res) => {
    req.logout()
    res.redirect("/login")
}
// exports.loginProcess = passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true
// })

// exports.privatePage = (req, res) => {
//     res.render("private", req.user)
// }

// exports.logout = (req, res) => {
//     req.logout()
//     res.redirect("/login")
// }

// exports.padrinoPage = (req, res) => {
//     res.render("padrino")
// }
// exports.editorPage = (req, res) => {
//     res.render("editor")
// }

// exports.invitadoPage = (req, res) => {
//     res.render("invitado")
// }

// exports.slackInit = passport.authenticate("slack")
// exports.slackCb = passport.authenticate("slack", {
//     successRedirect: "/private-page",
//     failureRedirect: "/login"
// })

// exports.googleInit = passport.authenticate("google", {
//     scope: [
//         "https://www.googleapis.com/auth/userinfo.profile",
//         "https://www.googleapis.com/auth/userinfo.email"
//     ]
// })

// exports.googleCb = passport.authenticate("google", {
//     successRedirect: "/private-page",
//     failureRedirect: "/login"
// })

// // Export por defecto
// // module.exports = 1
