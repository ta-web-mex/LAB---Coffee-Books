const express = require('express');
const router  = express.Router();
const {
    signUpView,
    signUpProcess,
    loginView,
    loginProcess,
    logoutProcess,
    facebookProcess,
    facebookRedirect,
    googleProcess,
    googleRedirect
  } = require("../controllers/auth")

  //Sign Up  
  router.get("/auth/signup", signUpView)
  router.post("/auth/signup", signUpProcess)

  //login
  router.get("/auth/login", loginView)
  router.post("/auth/login", loginProcess)

  //logout  
  router.get("/auth/logout", logoutProcess)

  router.get("/auth/google", googleProcess)
  router.get("/auth/google/callback", googleRedirect)
  
  router.get("/auth/facebook", facebookProcess)
  router.get("/auth/facebook/callback", facebookRedirect)

module.exports = router;
