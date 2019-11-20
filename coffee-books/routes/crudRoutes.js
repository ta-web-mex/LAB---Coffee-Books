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
  




module.exports = router