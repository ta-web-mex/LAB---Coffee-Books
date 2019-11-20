const router = require("express").Router();
const {
    createGet, createPost, placeEditPost,placeEdit,placeDelete
} = require("../controllers/protected.controller");

router.get("/create", createGet);
router.post("/create", createPost);

///
/*eliminar */
router.get("/place/:id/delete", placeDelete);
/*actualizar*/
router.get("/place/:id/edit", placeEdit);
router.post("/place/:id/edit", placeEditPost);



module.exports = router;