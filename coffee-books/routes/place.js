const express = require('express');
const router = express.Router();
const {
    getPlaces,
    getPlace,
    addPlaceView,
    addPlaceProcess,
    editPlaceView,
    editPlaceProcess,
    deletePlace
} = require('../controllers/place')
const {
    ensureLogin
} = require('../middlewares/index')

router.get('/places/add', ensureLogin('/login'), addPlaceView)
router.post('/places/add', ensureLogin('/login'), addPlaceProcess)
router.get('/places/edit/:placeId', ensureLogin('/login'), editPlaceView)
router.post('/places/edit/:placeId', ensureLogin('/login'), editPlaceProcess)
router.get('/places/delete/:placeId', ensureLogin('/login'), deletePlace)
router.get('/places', getPlaces);
router.get('/places/:placeId', ensureLogin('/login'), getPlace)

module.exports = router