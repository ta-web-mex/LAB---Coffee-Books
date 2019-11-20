const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: String,
    places: [String]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model("User", userSchema);