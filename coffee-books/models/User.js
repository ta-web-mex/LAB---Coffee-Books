//ITERACION 1 - Create the User MOdel 

const {Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        places: 
        {
            type: Schema.Types.ObjectId,
            required: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('User', userSchema)