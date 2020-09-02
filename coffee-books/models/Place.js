const {Schema, model} = require("mongoose")

const placeSchema =  new Schema ({
  name: String,
  placeType:String,
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  }
)

placeSchema.index({ location: "2dsphere" })

module.exports=model("Place", placeSchema)

