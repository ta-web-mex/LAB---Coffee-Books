const passport = require('passport');
const User = require('../models/User')
const {
    genSaltSync,
    hashSync
} = require('bcryptjs')

exports.signupView = (req, res) => {
    res.render('auth/signup', {
        user: req.user
    })
}

exports.signupProcess = async(req, res) => {
    const {
        email,
        name,
        password
    } = req.body
    const existingUser = await User.findOne({
        email
    })
    if (existingUser) return res.render('/signup', {
        error: "An error occured. Please try again."
    })
    const hashPwd = hashSync(password, genSaltSync(12));
    await User.create({
        email,
        name,
        password: hashPwd
    })
    res.render('auth/login', {
        user: req.user
    })
}

exports.loginView = (req, res) => {
    res.render('auth/login', {
        error: req.flash('error'),
        user: req.user
    })
}

exports.loginProcess = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: "/login",
    failureFlash: true
})

exports.googleProcess = passport.authenticate('google', {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
})

exports.googleRedirect = passport.authenticate('google', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
})

exports.facebookProcess = passport.authenticate('facebook', {
    scope: [
        "email"
    ]
})

exports.facebookRedirect = passport.authenticate('facebook', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
})

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login')
}