const {Schema, model} = require("mongoose")

const userSchema =  new Schema ({
  name:String,
  email:String,
  password:String,
  places:Array,
  googleID: String,
  facebookID: String,
})

module.exports=model("User", userSchema)