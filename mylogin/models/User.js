const {model, Schema}= require('mongoose')
const PLM = require('passport-local-mongoose')


const UserSchema = new Schema(
  {
    nema:String,
    email:String,
    places: Array
  },{
    timestamps:true,
    versionKey_:false
  }
)

UserSchema.plugin(PLM, {usernameField:"email"})
module.exports = model('user',UserSchema )