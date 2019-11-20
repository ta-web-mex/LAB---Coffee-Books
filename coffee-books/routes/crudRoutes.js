const router = require("express").Router();
const Place = require("../models/Place")

router.get("/create",  (_, res) => {
    res.render("crud/create")
})

router.post("/create" , async (req, res, next) => {
    const { _id } = req.user;
    const place = await Place.create({ ...req.body, author: _id });
    res.redirect("/");
  });

  router.get('/places/:id/edit', (req, res) => {
    const { id } = req.params;
    console.log(id)
    Place.findById(id)
      .then((place) => {
        const config = {
          action: `/places/${id}/edit`
        };
        res.render('crud/edit', { config, place });
      })
      .catch((err) => console.log(err));
  });
  router.post('/places/:id', (req, res) => {
    const { id } = req.params;
    Place.findByIdAndUpdate(id, {	$set: {...req.body}}, { new: true })
      .then((place) => res.redirect(`/places/${place._id}`))
      .catch((err) => console.log(err));
  });

module.exports = router