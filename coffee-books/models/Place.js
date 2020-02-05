const { model, Schema } = require('mongoose')
const placeSchema = new Schema({

  name: String,
  location: {
    address: String,
    coordinates: [Number]
  },
  placeType: {
    type: String,
    enum:['coffee shop', 'bookstore']
  }

},{
  timestamps: true,
  versionKey: false
})

module.exports = model('Place', placeSchema)