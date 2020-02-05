const express = require('express');
const router  = express.Router();
const {createGet, createPost} = require('../controllers/placeControllers')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('places');
});

router.get('/create', createGet);
router.post('/create', createPost);


module.exports = router;