const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    email: {
        type:String,
    },
    places: {
      type: {type: String},
    },
    googleID: String,
    // facebookID: String
  },
  {
    timestamps: true
  }
)

module.exports = model("User", userSchema)