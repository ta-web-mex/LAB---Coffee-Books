const { model, Schema } = require('mongoose')

const placeSchema = new Schema({
  name: String,
  location: { type: { type: String }, coordinates: [Number] },
  placeType: {
    type: String,
    enum: ['coffee shop', 'bookstore'],
  },
})

placeSchema.index({ location: '2dsphere' })

module.exports = model('Place', placeSchema)
