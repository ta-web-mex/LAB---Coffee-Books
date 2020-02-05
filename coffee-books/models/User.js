const { model, Schema } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema({
    name: String,
    email: String,
    places: Array
})

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);