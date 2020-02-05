const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");
const PLM = require("passport-local-mongoose")

const userSchema = new Schema(
  {
    name: String,
    email: String,
    places: Array
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: "email"} )
const User = mongoose.model("User", userSchema)
module.exports = model('User', userSchema)