const Place = require('../models/Place')

exports.indexGet = async (_, res) => {
  const places = await Place.find().sort({ createdAt: -1 })
  res.render('index', { places })
}

exports.createGet = (_, res) => {
  const options = ['church', 'bar', 'cantina', 'restaurant', 'other']
  res.render('create', { options })
}