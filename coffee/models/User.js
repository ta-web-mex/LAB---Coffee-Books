const { model, Schema } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = Schema({
  name: String,
  email: String,
  places: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
  facebookId: String,
})

userSchema.plugin(PLM, { usernameField: 'email' })
module.exports = model('User', userSchema)
