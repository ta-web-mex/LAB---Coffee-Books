const express = require('express');
const router = express.Router();
const {signupView, signupProcess, loginView, loginProcess, logout, privatePage,  googleInit, googleCb}= require("../controllers/auth");
const { isAuth, isNotAuth, checkRoles } = require("../middleware")
const {savePlace, updatePlace, editPlace, detailsPage}= require("../controllers/places")
/* GET home page */
router.get('/', (req, res) => res.render('index'));


//Auth
router.get('/signup', isNotAuth, signupView)
 router.post('/signup', isNotAuth, signupProcess)
router.get('/login', isNotAuth, loginView)
router.post('/login', isNotAuth, loginProcess)
router.get("/logout", logout)
//social google
router.get('/auth/google', googleInit)
router.get('/auth/google/callback', googleCb)
//facebook

//places
router.get("/private-page", isAuth, privatePage)
router.post("/privatePage", isAuth, savePlace )
router.get("/feeds")
router.get("/detail/:placeId", isAuth, detailsPage)
router.get("/update/:placeId", isAuth, updatePlace)
router.get("/edit/:placeId", isAuth, editPlace)
router.get("/delete/:placeId", isAuth)

module.exports = router;