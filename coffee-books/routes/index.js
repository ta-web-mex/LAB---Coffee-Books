const express = require('express');
const router  = express.Router();

const {
  index,
  feedGet,
  placeDetail,
  placeDelete
  // placeEdit,
  // placeEditPost
} = require('../controllers/index.controller');

router.get('/', index);
router.get('/feed', feedGet);
router.get('/place/:id', placeDetail);
router.get("/place/:id/delete", placeDelete);
/*actualizar*/
// router.get("/place/:id/edit", placeEdit);
// router.post("/place/:id/edit", placeEditPost);
module.exports = router;
