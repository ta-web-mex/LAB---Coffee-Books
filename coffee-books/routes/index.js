const express = require('express');
const router  = express.Router();
const Place = require("../models/Place")

/* GET home page */
router.get('/',  (req, res, next) => {
  res.render('index');
});

router.get("/login",  (req, res) => {
  res.render("auth/login")
})

router.get("/crud", async (req, res) => {
  const places = await Place.find()
  res.render("crud",{places})
})

router.get("/feed", async (req, res, next) => {
  const places = await Place.find().populate("author");
  res.render("feed", { places });
});

router.get("/place/:id", async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findById(id).populate("author");
  console.log(place)
  res.render("placeDetail", {
    place,
    coordinates: place.location.coordinates
  });
});

module.exports = router;
