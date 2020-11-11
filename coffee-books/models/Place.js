const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const placeSchema = new Schema({
  name: String,
  location: String,
  placeType: String, enum: ['coffee shop', 'bookstore']
});
 
const Place = mongoose.model('Place', placeSchema);
 
module.exports = Place;


