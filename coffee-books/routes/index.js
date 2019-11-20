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

router.post("/places/:id/delete", (req, res) => {
  const {id} = req.params
  Place.findByIdAndDelete(id)
      .then(() => res.redirect("/"))
      .catch(err => console.log(err))
})

router.get('/places/:id/edit', (req, res) => {
  const { id } = req.params;
  Place.findById(id)
    .then((place) => {
      res.render('crud/edit', { place });
    })
    .catch((err) => console.log(err));
});

router.post('/places/:id/edit', (req, res) => {
  const { id } = req.params;
  console.log({...req.body})
  Place.findByIdAndUpdate(id, {	$set: {...req.body}}, { new: true })
    .then((place) => res.redirect(`/places/${place._id}/edit`))
    .catch((err) => console.log(err));
});

module.exports = router;
