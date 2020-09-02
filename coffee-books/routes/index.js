const express = require('express');
const router = express.Router();

const { getPlaces } = require("../controllers/places")

/* GET home page */
router.get('/', getPlaces)

module.exports = router;