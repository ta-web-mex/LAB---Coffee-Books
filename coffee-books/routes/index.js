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
  console.log("hola")
  const {id} = req.params
  console.log(id)
  Place.findByIdAndDelete(id)
      .then(() => res.redirect("/"))
      .catch(err => console.log(err))
})



module.exports = router;
