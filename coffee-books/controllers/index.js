const passport = require("../config/passport");
const Place = require("../models/Place");
const User = require("../models/User");

exports.loadIndex = async (req, res, next) => {
  const places = await Place.find();
  console.log("loadindexxxx", places);
  res.render("index", { places });
};

exports.loadGoogle = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
});

exports.loginGoogle = passport.authenticate("google", {
  successRedirect: "/private",
  failureRedirect: "/",
});

exports.loadFacebook = passport.authenticate("facebook", {
  scope: ["email"],
});

exports.loginFacebook = passport.authenticate("facebook", {
  successRedirect: "/private",
  failureRedirect: "/",
});

exports.loadPrivate = async (req, res) => {
  const places = await Place.find();
  res.render("private", { places });
};

exports.loadCreatePlace = (req, res) => {
  res.render("createPlace");
};

exports.createPlace = async (req, res) => {
  const { name, placeType, lat, lng } = req.body;
  const loc = {
    type: "Point",
    coordinates: [lng, lat],
  };
  const place = await Place.create({
    name,
    location: loc,
    placeType,
  });
  await User.findByIdAndUpdate(req.user.id, { $push: { places: place._id } });
  res.redirect("/private");
};

exports.loadUpdatePlace = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  console.log(place);
  res.render("updatePlace", place);
};
exports.updatePlace = async (req, res) => {
  const { id } = req.params;
  const { name, placeType, lat, lng } = req.body;
  const loc = {
    type: "Point",
    coordinates: [lng, lat],
  };
  await Place.findByIdAndUpdate(id, { name, location: loc, placeType });
  res.redirect("/private");
};
exports.deletePlace = async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.redirect("/private");
};
