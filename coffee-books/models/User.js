const {
    Schema,
    model
} = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    places: {
        type: [Schema.Types.ObjectId],
        ref: 'Place'
    },
    password: String,
    googleID: String,
    facebookID: String
}, {
    timestamps: true
})

module.exports = model('User', userSchema)