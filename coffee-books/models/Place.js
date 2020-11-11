const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: String,
    placeType: {
      type: String,
      enum: ["Coffee Shop", "Bookstore"]
    },
    location: {
      address: String,
      coordinates: [Number]
    },
  },
  {
    timestamps: true
  }
);

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;