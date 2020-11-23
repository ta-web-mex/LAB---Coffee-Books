
const {model, Schema} = require('mongoose');
const PLM = require('passport-local-mongoose')

const userSchema = new Schema (
  {
    email: String,
    name: String,
    googleID: String,
    places: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Place'
      }
    ],
    role: {
      type: String,
      enum: ["ADMIN", "GUEST"],
      default: "GUEST"
    }
  }
)

userSchema.plugin(PLM,{usernameField: 'email'})

module.exports = model('User', userSchema)