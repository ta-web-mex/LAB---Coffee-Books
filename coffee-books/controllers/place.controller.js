const PlaceModel = require("../models/Place.model")

module.exports = {
  async listPlaces(req, res) {
    res.render('map/map', { token: process.env.MAPBOX_TOKEN });
  },

  newPlaceGET(_req, res) {
    res.render('map/new', { token: process.env.MAPBOX_TOKEN });
  },

  async newPlacePOST(req, res) {
    const { name, placeType, lng, lat } = req.body;
    const location = {
      type: 'Point',
      coordinates: [lng, lat],
    }

    await PlaceModel.create({
      name,
      placeType,
      location,
    });
    res.redirect('/map');
  },

  async feeds(req, res) {
    const places = await PlaceModel.find();
    if (!places) return res.render('map/feeds', { token: process.env.MAPBOX_TOKEN });
    res.render('map/feeds', { places, token: process.env.MAPBOX_TOKEN, user: req.user });
  }
}