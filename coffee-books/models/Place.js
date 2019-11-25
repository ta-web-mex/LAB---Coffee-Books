const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;