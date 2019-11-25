 
const express = require("express");
const placesRouter = express.Router();
const Place = require("../models/Place");
const User = require("../models/User");

placesRouter.get("/feeds", async (req, res, next) => {
  const places = await Place.find({})
    .sort({ createdAt: -1 })
    .populate("author");
  if (places) {
    res.render("places/feed", { places });
  } else {
    next();
  }
});

placesRouter.get("/places", ensureLogin, async (req, res, next) => {
  const places = await Place.find({});
  if (places) {
    res.render("places", { places });
  } else {
    next();
  }
});

placesRouter.get("/places/new", ensureLogin, async (req, res) => {
  res.render("places/new");
});

placesRouter.get("/places/:_id", ensureLogin, async (req, res, next) => {
  const { _id } = req.params;
  const place = await Place.findOne({ _id });
  if (place) {
    res.render("places/show", { place });
  } else {
    next();
  }
});

placesRouter.get("/places/:_id/edit", ensureLogin, async (req, res, next) => {
  const { _id } = req.params;
  const place = await Place.findOne({ _id });
  if (place) {
    res.render("places/edit", { place });
  } else {
    next();
  }
});

placesRouter.post("/places", ensureLogin, async (req, res, next) => {
  const author = req.session.passport.user;
  const { name, address, latitude, longitude, placeType } = req.body;
  const place = {
    author,
    name,
    location: { address, coordinates: [longitude, latitude] },
    placeType
  };
  const createResult = await Place.create(place);
  if (createResult) {
    const user = await User.findOne({ _id: author });
    user.places = [...user.places, createResult.id];
    await user.save();
    res.redirect("/places");
  } else {
    res.render("/places/new", { error: "Error saving the place" });
  }
});

placesRouter.post("/places/:_id", ensureLogin, async (req, res) => {
  const { _id } = req.params;
  const { name, address, latitude, longitude, placeType } = req.body;
  const place = await Place.findOneAndUpdate(
    { _id },
    {
      name,
      location: { address, coordinates: [longitude, latitude] },
      placeType
    }
  );
  if (place) {
    res.redirect("/places");
  } else {
    res.render("/places/edit", { place, error: "Error saving the place" });
  }
});

placesRouter.post(
  "/places/:_id/delete",
  ensureLogin,
  async (req, res, next) => {
    const { _id } = req.params;
    const deleteResult = await Place.findOneAndRemove({ _id });
    if (deleteResult) {
      const author = req.session.passport.user;
      const user = await User.findOne({ _id: author });
      user.places = user.places.filter(placeId => placeId !== _id);
      await user.save();
      res.redirect("/places");
    } else {
      next();
    }
  }
);

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login");
}

module.exports = placesRouter;