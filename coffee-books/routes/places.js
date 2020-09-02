const express = require('express');
const router  = express.Router();
const {
    indexView,
    createPlaceView,
    createPlace,
    editPlace,
    editPlaceView,
    detailPlaceView,
    deletePlace
  } = require("../controllers/places")

const { ensureLogin } = require("../middleware")


router.get("/places/index", ensureLogin("/auth/login") ,indexView)

router.get("/places/add", ensureLogin("/auth/login"), createPlaceView)
router.post("/places/add", ensureLogin("/auth/login"), createPlace)


router.get("/places/update/:placeId", ensureLogin("/auth/login"), editPlaceView)
router.post("/places/update/:placeId",ensureLogin("/auth/login"), editPlace)

router.get("/places/detail/:placeId", ensureLogin("/auth/login"), detailPlaceView)


router.get("/places/delete/:placeId", ensureLogin("/auth/login"), deletePlace)

module.exports = router;
