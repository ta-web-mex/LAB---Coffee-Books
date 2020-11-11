const express = require('express');
const router = express.Router();
const {
    signUpView,
    signupMethod,
    loginView,
    loginMethod,
    logoutView,
    googleInit,
    googleCb,
    facebookInit,
    facebookCb
} = require('../controllers/auth')

router.get('/signup', signUpView)
router.post('/signup', signupMethod)
router.get('/login', loginView)
router.post('/login', loginMethod)
router.get('/logout', logoutView)

router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)

router.get("/auth/facebook", facebookInit)
router.get("/auth/facebook/callback", facebookCb)


module.exports = router;