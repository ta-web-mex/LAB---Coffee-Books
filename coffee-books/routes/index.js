const express = require('express');
const router  = express.Router();

const Place = require('../models/Place')

/* GET home page */
router.get('/', async (req, res, next) => {
  const places = await Place.find().sort({createdAt: -1})
  res.render('index', {places});
});

module.exports = router;
