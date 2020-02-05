const { model, Schema } = require('mongoose')
const PLM = require('passport-local-mongoose')
const userSchema = new Schema({
  name:{
    type: String
  },
  email:{
    type: String
  },
  places:{
    type: [Schema.Types.ObjectId]
  },
  googleID: String
}, {
  timestamps: true,
  versionKey: false
})

userSchema.plugin(PLM, { usernameField: 'email'})

module.exports = model('User', userSchema)