const { Schema, model } = require('mongoose')

const placeSchema = new Schema (
  {
    name: String,
    placeType: {
      type: String,
      enum: ['coffee shop', 'bookstore']
    },
    location: {
      //this type is added because of the geolocation feature of mongo
      type: { type: String },
      coordinates: [Number]
    }
  },
  {
    timestamps: true
  }
)

//to use the geolocation feature of mongo
placeSchema.index({ location: '2dsphere' })

module.exports = model('Place', placeSchema)