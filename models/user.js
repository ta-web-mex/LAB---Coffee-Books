// Iniciamjos la DB

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creamos el esquema 

const userSchema = new Schema (
    {
        name: String,
        email: String,
        googleId : String,
        places: [{ type: Schema.ObjectId}]
    },
    {
        timestamps: true
    } 
)

const User = mongoose.model('User', userSchema)
module.exports = User