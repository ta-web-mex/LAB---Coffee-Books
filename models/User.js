const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true
    },
    password: String,
    // role: {
    //   type: String,
    //   enum: ["ELPADRINO", "EDITOR", "INVITADO"],
    //   default: "INVITADO"
    // },
    places: Schema.Types.ObjectId,
    googleID: String,
    facebookID: String
  },
  {
    timestamps: true
  }
)

module.exports = model("User", userSchema)
