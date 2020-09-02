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
} = require("../controllers/auth")

const {
    PlaceView,
    createPlace,
    editPlace,
    getPlace,
    deletePlace
} = require("../controllers/places")


const User = require("../models/User")


router.get("/signup", signupView)
router.post("/signup", signupProcess)

router.get("/login", loginView)
router.post("/login", loginProcess)

//Social
router.get("/auth/google", googleProcess)
router.get("/auth/google/callback", googleRedirect)

router.get("/auth/facebook", facebookProcess)
router.get("/auth/facebook/callback", facebookRedirect)

//Places
router.get("/places/new", PlaceView)
router.post("/places/new", createPlace)

router.get("/places/:placeId", getPlace)
router.post("/places/edit/:placeId", editPlace)

router.get("/places/delete/:placeId", deletePlace)


router.get("/logout", logout)


module.exports = router;