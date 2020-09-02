const express = require('express');
const router = express.Router()
// Requerir middlewares

const { 
  googleProcess,
  googleRedirect
} = require('../controllers/auth');

const { 
  listPlaces,
  createPlaceForm,
  createPlace,
  viewPlace,
  editPlaceForm,
  editPlace,
  deletePlace
} = require('../controllers/places');

const {ensureLogin} = require('../middlewares')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// AUTH
router.get('/auth/google/callback', googleRedirect)

router.get('/auth/google', googleProcess)

// PLACES
router.get('/places', ensureLogin('/'), listPlaces)
router.get('/places/new', ensureLogin('/'), createPlaceForm)
router.post('/places/new', ensureLogin('/'), createPlace)
router.get('/places/:id', ensureLogin('/'), viewPlace)
router.get('/places/:id/edit', ensureLogin('/'), editPlaceForm)
router.post('/places/:id/edit', ensureLogin('/'), editPlace)
router.get('/places/:id/delete', ensureLogin('/'), deletePlace)

module.exports = router;
