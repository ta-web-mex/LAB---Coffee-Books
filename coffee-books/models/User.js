const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    places: [
        {
          type: Schema.Types.ObjectId,
          ref: "Place"
        }
      ],      
    googleID: String,
    facebookID: String,
    slackID: String
}, {
    timestamps: true
})

module.exports = model("User", userSchema)