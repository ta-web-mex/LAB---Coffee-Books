//ITERACION 3 - Create the Place Model

const {Schema, model} = require('mongoose')

const placeSchema = new Schema(
    {
        name: String,
        location: Object,
        placeType: {
            type: String,
            enum: ['coffee shop', 'bookstore']
        }
    },
    {
        timestamps: true
    }
)

placeSchema.index({location: '2dsphere'})

module.exports = model('Place', placeSchema)