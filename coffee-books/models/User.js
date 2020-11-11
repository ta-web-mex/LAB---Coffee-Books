//ITERACION 1 - Create the User MOdel 

const {Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
        name: String,
        email: String,
        places: 
        {
            type: [ObjectId]
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('User', userSchema)