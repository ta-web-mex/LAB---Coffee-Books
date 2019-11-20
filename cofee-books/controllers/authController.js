
exports.LogIn = (req, res, next) => {
  res.render('login')
}
exports.SignUp = (req, res, next) => {
  res.render('signup')
}
exports.callbackRedirect = (req, res, next) =>{
  res.redirect('/user/create');
}

exports.logout = (req, res, next)=>{
  req.logout();
  res.redirect('/');
}