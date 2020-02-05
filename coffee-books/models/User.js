const mongoose = require("mongoose")
const Schema = mongoose.Schema
const model = mongoose.model
const PLM = require("passport-local-mongoose")

const userSchema = new Schema ({
  name: String,
  email: String, 
  facebookID: String,
  places: [Schema.Types.ObjectId]
})
userSchema.plugin(PLM, { usernameField: "email" });
const User = mongoose.model("User", userSchema);
module.exports = User;

module.exports= model("User", userSchema)