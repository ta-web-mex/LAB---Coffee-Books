const passport=require("../config/passport")
const Place=require("../models/Place.model")

//Vista de login
exports.loginView= (req, res)=>{
    res.render("auth/login")
}

//Vista de places (CRUD)
exports.places= async (req,res)=>{
    const places= await Place.find()
    console.log(places)
    res.render("places", {places})
}

exports.feeds= async (req,res)=>{
    const places= await Place.find()
    console.log(places)
    res.render("feeds", {places})
}

//Vista de logout
exports.logout=(req,res)=>{
    req.logout()
    res.redirect("/login")
}

//Autenticacion de Google
exports.googleInit=passport.authenticate("google",{
    scope:[    
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"]
})

exports.googleCb=passport.authenticate("google",{
    successRedirect:"/places",
    failedRedirect:"/login"
})

//Autenticacion de Facebook
exports.facebookInit=passport.authenticate("facebook")

exports.facebookCB=passport.authenticate("facebook",{
    successRedirect:"/places",
    failedRedirect:"/login"
})