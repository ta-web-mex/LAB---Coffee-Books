const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: String,
    email: String,
    places: [{
      type: Schema.Types.ObjectId,
      ref: 'Place'
    }],
    googleId: String,
    facebookId: String
  },
  {
    timestamps: true
  }
)

module.exports = model('User', userSchema)