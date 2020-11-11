const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  googleID: String,
  facebookID: String, 
  places: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Place'
    }
  ]
});
const User = mongoose.model("User", userSchema);
module.exports = User