const User = require ('../models/User')

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}