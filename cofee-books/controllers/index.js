const Place = require('../models/Place')

exports.feed = async (_, res) => {
  const places = await Place.find();
  res.render('feed', {places})
}