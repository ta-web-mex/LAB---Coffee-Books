const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placesSchema = new Schema (
    {
        name: String,
        location: Object,
        placesType: {
            type: String,
            enum: ['coffe shop', 'bookstore']
        }
    },
    {
        timestamps: true
    } 
)

const Places = mongoose.model('Places', placesSchema)
module.exports = Places