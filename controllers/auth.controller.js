const User = require('../models/User')

exports.loginView = async (res, req, next) => {
  req.render('auth/login')
}

exports.signupView = async (res, req, next) => {
  req.render('auth/signup')
}

exports.logOut = async (req,res) => {
  req.logOut()
  res.redirect('/login')
}

exports.signupPost = async (req,res) => {
  const { name, email, password } = req.body;

  if (email === "" || password === "") {
    res.render("auth/signup");
  }

  const userOnDB = await User.findOne({ email });
  if (userOnDB !== null) {
    res.render("auth/signup");
  }
  await User.register({ name, email }, password);
  res.redirect("/login");
};

exports.loginView = (req, res) => {
  res.render("auth/login");
};