const { isAuth } = require('../middlewares/index');
const { listPlaces, newPlacePOST, newPlaceGET, feeds } = require('../controllers/place.controller');

const router = require('express').Router();

router.get('/map', listPlaces);
router.get('/feeds', feeds);
router.get('/map/new', isAuth, newPlaceGET);
router.post('/map/new', isAuth, newPlacePOST);

module.exports = router;