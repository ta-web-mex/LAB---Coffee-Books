const express = require('express');
const router = express.Router();

const { isAuth } = require("../middlewares")

const {
    profileView,
    placesView,
    placesCreate,
    placesCreateMethod,
    placeEdit,
    placeEditMethod,
    placeDelete
} = require('../controllers/private')

router.get('/profile', isAuth, profileView)
router.get('/places', isAuth, placesView)
router.get('/places/create', isAuth, placesCreate)
router.post('/places/create', isAuth, placesCreateMethod)
router.get('/places/edit/:placeId', isAuth, placeEdit)
router.post('/places/edit/:placeId', isAuth, placeEditMethod)
router.get('/places/delete/:placeId', isAuth, placeDelete)

module.exports = router;