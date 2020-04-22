const { model, Schema } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema({
  name: String,
  email: String,
  places: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
  facebookID: String,
  googleID: String,
})

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = model('User', userSchema)
