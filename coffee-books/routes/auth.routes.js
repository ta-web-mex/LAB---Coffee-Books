const router = require('express').Router();
const {
  facebookInit,
  facebookCb,
  googleInit,
  googleCb,
  signup,
  login,
  profile,
  logout,
} = require('../controllers/auth.controller');

router.get('/auth/facebook', facebookInit);
router.get('/auth/facebook/callback', facebookCb);
router.get('/auth/google', googleInit);
router.get('/auth/google/callback', googleCb);

router.get('/signup', signup);
router.get('/login', login);
router.get('/profile', profile);
router.get('/logout', logout);

module.exports = router;