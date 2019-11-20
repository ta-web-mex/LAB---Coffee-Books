const express = require('express');
const router  = express.Router();
const Place = require("../models/Place")

/* GET home page */
router.get('/', async (req, res, next) => {
  const places = await Place.find()
  res.render('index',{places}  );
});

router.get("/login",  (req, res) => {
  res.render("auth/login")
})


module.exports = router;
