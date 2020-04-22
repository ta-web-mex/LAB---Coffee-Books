const Place = require('../models/Place');
const passport = require('../config/passport');

exports.listPlaces = async (req, res) => {
  const places = await Place.find();
  res.render('places/listPlaces', { places });
};

exports.addPlace = (req, res) => res.render('places/addPlace');

exports.addPlaceProcess = async (req, res) => {
  const { name, placeType, longitude, latitude } = req.body;
  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };
  await Place.create({
    name,
    placeType,
    location,
  });
  res.redirect('/yourPlaces');
};

exports.detailPlace = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.render('places/detailPlace', place);
};

exports.placeDelete = async (req, res, next) => {
  await Place.findByIdAndDelete(req.params.id);
  res.redirect('/yourPlaces');
};

exports.editPlace = async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render('places/editPlace', place);
};

exports.editPlaceProcess = async (req, res) => {
  const { name, coor, placeType } = req.body;
  console.log(name, coor, placeType);
  long = Number(coor.split(',')[1]);
  lat = Number(coor.split(',')[1]);


  const location = {
    type: 'Point',
    coordinates: { 0: long, 1: lat },
  };
  console.log(location);
  await Place.findByIdAndUpdate( req.params.id,
    {
      name,
      placeType,
    },
    { new: true }
  );

  res.redirect('/yourPlaces');
};
