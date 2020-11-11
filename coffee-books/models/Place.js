const { Schema, model } = require("mongoose")

const placeSchema = new Schema(
  {
    name: String,
    location: Object,
    placeType: {
      type: String,
      enum: ['Coffee Shop', 'Bookstore']
    }
  },
  {
    timestamps: true
  }
)

module.exports = model("Place", placeSchema)