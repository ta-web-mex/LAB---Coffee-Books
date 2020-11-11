const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: String,
    googleID: String,
    facebookID: String
  },
  {
    timestamps: true
  }
)

module.exports = model("User", userSchema)