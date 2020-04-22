const { model, Schema } = require('mongoose')
const localMongoose = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    name: String,
    email: String,
    places: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Places',
      },
    ],
    facebookId: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

userSchema.plugin(localMongoose, { usernameField: 'email' })
module.exports = model('User', userSchema)
