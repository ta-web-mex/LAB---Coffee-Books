const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
      }
    ],
    facebookId: String,
    googleId: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", userSchema);
module.exports = User;
