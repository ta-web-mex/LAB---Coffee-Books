const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    email: String,
    password: String,
    places:Schema.Types.ObjectId,
    googleID: String,
    facebookID:String
    },
  {
    timestamps: true
  }
)

module.exports = model("User", userSchema)