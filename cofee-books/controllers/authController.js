const User = require('../models/User')

exports.signupView = (req, res) => {
    res.render('signup')
}

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body

    const user = await User.findOne({ email })
    if (user !== null) {
      res.render("signup", { msg: "El correo ya fue registrado" })
    }
    await User.register({ name, email }, password)
    res.redirect("/login")
}

exports.loginView = (req, res, next) => {
    res.render('login')
}

exports.logout = (req, res) => {
    req.logout()
    res.redirect("/");
}

