const router = require('express').Router();
const { createGet, createPost, getPlaces } = require('../controllers/protected.controller');

// router.get('/view')
router.get('/places', getPlaces);
router.get('/create', createGet);
router.post('/create', createPost);

module.exports = router;
