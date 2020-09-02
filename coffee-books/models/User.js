const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Eduardo'
  },
  email: String, 
  places: [{
    type: Schema.Types.ObjectId,
    ref: 'Place'
  }],
  googleID: String
},
{
  timestamps: true
})

module.exports = model('User', userSchema)