const { model, Schema } = require("mongoose");
// const PLM = require('passport-local-mongoose')

const placeSchema = new Schema({
  name: String,
  location: { type: { type: String }, coordinates: [Number] },
  placesType: {
    type: String,
    enum: ['coffee shop', 'bookstore']
  },
  })
  
  placeSchema.index({ location: "2dsphere" });

  // placeSchema.plugin( PLM, { usernameField: 'email' })
  module.exports = model("Place", placeSchema);
  