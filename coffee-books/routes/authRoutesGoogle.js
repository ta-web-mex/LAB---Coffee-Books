const router = require('express').Router();
const passport = require('passport');
const { callbackRedirect, logout } = require('../controllers/auth.controller');

router.get('/login', passport.authenticate('google', { scope: [ 'profile' ] }));
router.get('/callback', passport.authenticate('google', { failureRedirect: '/' }), callbackRedirect);
router.get('/logout', logout);

module.exports = router;
