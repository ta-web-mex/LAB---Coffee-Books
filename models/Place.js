const { model, Schema } = require('mongoose');
const placeSchema = new Schema(
  {
    name: { type: String },
    location: { type: { type: String }, coordinates: [Number] },
    placeType: {
      type: String,
      enum: ['coffee shop', 'bookstore'],
    },
  },
  { timestamps: true }
);
module.exports = model('Place', placeSchema);
