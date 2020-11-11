module.exports = {
  isAuth(req, res, next) {
    if (req.user) return next();
    return res.redirect('/');
  }
}