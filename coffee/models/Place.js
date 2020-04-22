const { model, Schema } = require('mongoose')

const placeSchema = new Schema(
  {
    name: String,
    location: { type: { type: String }, coordinates: [Number] },
    placesType: { type: String, enum: ['coffee shop', 'bookstore'] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

module.exports = model('Place', placeSchema)
