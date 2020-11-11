const { Schema, model } = require("mongoose")

const placeSchema = new Schema({
    name: String,
    location: {
        type: { type: String },
        coordinates: [Number]
    },
    placeType: {
        type: String,
        enum: ['coffee shop', 'bookstore']
    }
}, {
    timestamps: true
})

module.exports = model("Place", placeSchema)