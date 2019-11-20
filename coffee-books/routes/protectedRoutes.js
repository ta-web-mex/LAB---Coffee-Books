const router = require('express').Router();
const { createGet, createPost } = require('../controllers/protected.controller');

// router.get('/view')
router.get('/create', createGet);
router.post('/create', createPost);

module.exports = router;
