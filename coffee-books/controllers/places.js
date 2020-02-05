const Places = require("../models/Place")

exports.placesGet = async (req, res, next) => {
  const places = await Places.find().cacth(err => next(err))
  res.render("places/", {
    places
  })
}

exports.placesGet = async (req, res, next) => {
  const places = await Places.findById(req.params.id)
    .catch(err => next(err))
    res.render("places/show", places)
}

exports.placesPost = async (req, res, next) => {
  const newPlace = {
    name,
    location,
    placesType
  } = req.body
  await Places.create(newPlace).catch(err => next(err))
  res.redirect("/places")
}

exports.placesDeleteGet = async (req, res, next) => {
  await Places.findByIdAndDelete(req.params.id).catch(err => next(err))
  res.redirect("/places")
}

exports.placesNewGet = (req, res, next) => res.render("/places/new")
