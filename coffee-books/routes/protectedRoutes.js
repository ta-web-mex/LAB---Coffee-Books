const router = require("express").Router();
const {
    createGet, createPost,placeEdit, placeEditPost
} = require("../controllers/protected.controller");

router.get("/create", createGet);
router.post("/create", createPost);

router.get("/place/:id/edit", placeEdit);
router.post("/place/:id/edit", placeEditPost);

module.exports = router;