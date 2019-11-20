const express = require('express');
const router = express.Router();

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
//router.get("/update/:id", placeUpdate);


/* Get de update*/
router.get("/../coffee-books/views/user/update.hbs", (req, res, next) => {
  placeDetail.findOne({
      _id: req.query.place._id
    })
    .then((place) => {
      res.render('/../coffee-books/views/user/update.hbs ', {
        place
      });
    })
    .catch((error) => {
      console.log(error);
    })
});



module.exports = router;