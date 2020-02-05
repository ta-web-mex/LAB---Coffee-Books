const express = require('express');
const router  = express.Router();
const {sortPlaces} = require('../controllers')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/feeds', sortPlaces)

module.exports = router;
