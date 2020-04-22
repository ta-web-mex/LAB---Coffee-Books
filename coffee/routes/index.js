const router = require('express').Router()
const ensureLogin = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.redirect('/login')
}
/* GET home page */
const {
  placesView,
  // indexGet,
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  placeGet,
  deletePlace,
  addPlace,
  sendPlace,
  detailPlace,
  logout,
  loginFacebook,
  loginFacebookCb,
} = require('../controllers')

// router.get('/', indexGet)

router.get('/signup', signupGet)
router.post('/signup', signupPost)

router.get('/login', loginGet)
router.post('/login', loginPost)

router.get('/auth/facebook', loginFacebook)
router.get('/auth/facebook/callback', loginFacebookCb)

router.get('/place', ensureLogin, placeGet)
router.get('/', placesView)
router.get('/place/new', addPlace)
router.post('/place/new', sendPlace)
router.get('/place/:id', detailPlace)
router.get('/place/:id/delete', deletePlace)
// router.get('/place/edit/:id', editPlaceGet)

router.get('/logout', logout)

module.exports = router
