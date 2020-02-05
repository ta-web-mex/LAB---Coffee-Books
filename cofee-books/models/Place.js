const {model, Schema} = require('mongoose')
const placeSchema = new Schema(
    {
name: String,
placeType: {
    type: String,
    enum: ['coffee shop', 'bookstore'],
},
location: {
    adress: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
},
},
{
    timestamps: true,
    versionKey: false
})

module.exports = model('Place', placeSchema)