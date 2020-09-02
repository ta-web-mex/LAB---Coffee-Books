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