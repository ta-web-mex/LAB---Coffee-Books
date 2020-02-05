const {model, Schema} = require('mongoose')

const placeSchema = new Schema(
  {
    name: String,
    location: Object,
    placeType: {
      type:String,
      enum: ['cofee shop', 'bookstore']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)


module.exports = model("Place", placeSchema);