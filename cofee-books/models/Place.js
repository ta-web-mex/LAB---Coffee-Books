const { model, Schema } = require('mongoose')

const Place = new Schema({
  name: String,
  location: {
    address: String,
    coords: [Number]
  },
  placeType: {
    type: String,
    enum:['coffee shop', 'bookstore']
  }},
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model("Place", Place);
