const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const placeSchema = new Schema(
  {
    name: String,
    location: Array,
    placesType: {
      "type": "string",
      "enum": ["coffee shop", "bookstore"]
    }

  },
  {
    timestamps: true,
    versionKey: false
  }
)


const Places = mongoose.model("Places", placeSchema)
module.exports = model('Places', placeSchema)


