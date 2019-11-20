const express = require('express');
const router  = express.Router();

const {
  index,
  feedGet,
  placeDetail
} = require("../controllers/index.controller");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/feed", feedGet);
router.get("/place/:id", placeDetail);

module.exports = router;
