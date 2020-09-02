const { model, Schema } = require("mongoose");
const userSchema = new Schema(
  {
    name: String,
    email: String,
    googleID: String,
    facebookID: String,
    password: String,
    places: [
      {
        type: Schema.Types.ObjectId,
        ref: "Place",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
