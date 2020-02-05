const express = require('express');
const router  = express.Router();
const {createGet, createPost, indexGet, deleteGet} = require('../controllers/placeControllers')

/* GET home page */
router.get('/places', indexGet);

router.get('/create', createGet);
router.post('/create', createPost);
router.get('/delete/:_id', deleteGet)

module.exports = router;