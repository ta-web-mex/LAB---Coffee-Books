const express = require('express');
const router = express.Router();
const {
    signupView,
    signupProcess,
    loginView,
    loginProcess,
    googleProcess,
    googleRedirect,
    facebookProcess,
    facebookRedirect,
    logout
} = require('../controllers/auth')
const {
    ensureLogin
} = require('../middlewares/index')

router.get('/signup', signupView)
router.post('/signup', signupProcess)
router.get('/login', loginView)
router.post('/login', loginProcess)
router.get('/auth/google', googleProcess)
router.get('/auth/google/callback', googleRedirect)
router.get('/auth/facebook', facebookProcess)
router.get('/auth/facebook/callback', facebookRedirect)
router.get('/logout', logout)

module.exports = router