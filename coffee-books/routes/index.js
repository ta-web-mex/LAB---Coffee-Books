const express = require("express");
const router = express.Router();
const { enssureLogin } = require("../middlewares/enssureLogin");
const {
  loadIndex,
  loadGoogle,
  loginGoogle,
  loadFacebook,
  loginFacebook,
  loadPrivate,
  loadCreatePlace,
  createPlace,
  loadUpdatePlace,
  updatePlace,
  deletePlace,
} = require("../controllers/index");
//FALTA ESTRATEGIA LOCAL!!!!!
router.get("/index", loadIndex);
router.get("/", (req, res) => {
  res.redirect("/index");
});
router.get("/auth/google", loadGoogle);
router.get("/auth/google/callback", loginGoogle);
router.get("/private", enssureLogin("/"), loadPrivate);
router.get("/auth/facebook", loadFacebook);
router.get("/auth/facebook/callback", loginFacebook);
router.get("/place/create", enssureLogin("/"), loadCreatePlace);
router.post("/place/create", enssureLogin("/"), createPlace);
router.get("/place/update/:id", enssureLogin("/"), loadUpdatePlace);
router.post("/place/update/:id", enssureLogin("/"), updatePlace);
router.get("/place/delete/:id", enssureLogin("/"), deletePlace);

module.exports = router;
