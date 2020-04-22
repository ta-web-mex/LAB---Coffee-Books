const { model, Schema } = require('mongoose')
const localMongoose = require('passport-local-mongoose')

const placeSchema = new Schema(
  {
    name: String,
    location: Object,
    placeType: {type: String, enum: ['coffee shop', 'bookstore']},
    facebookId: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

placeSchema.index({ location: "2dsphere" });

module.exports = model("Place", placeSchema);