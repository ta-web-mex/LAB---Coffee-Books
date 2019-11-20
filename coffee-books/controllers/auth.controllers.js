exports.callbackRedirect = (req, res, next) => {
    res.redirect("/user/profile");
  };
  
  exports.logout = (req, res, next) => {
    req.logout();
    res.redirect("/");
  };