const {model, Schema} = require('mongoose');

const userSchema = new Schema (
  {
    name: String,
    facebookId:String,
    googleId:String
  },//padre
  {
    places: {
      type: Schema.Types.ObjectId,
      ref:"Place"
    }
  }, 
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model("User", userSchema)