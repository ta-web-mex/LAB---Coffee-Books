const { Schema, model } = require("mongoose")

const placeSchema = new Schema(
    {
            name: {
                type: String
        },
        location: {
            type: { type: String },
            coordinates: [Number]
        },
          placeType: {
                type: String,
                enum: ['coffee shop','bookstore']
        }
    },
    {
       timestamps: true
    }
)

placeSchema.index({ location: "2dsphere" })

module.exports = model("Place", placeSchema)