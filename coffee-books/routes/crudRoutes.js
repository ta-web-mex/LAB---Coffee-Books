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






module.exports = router