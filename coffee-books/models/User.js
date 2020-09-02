const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    places: [{
        type: Schema.Types.ObjectId,
        ref: "Place"
    }],
    password: String,
    googleID: String
}, {
    timestamps: true
})

module.exports = model("User", userSchema)