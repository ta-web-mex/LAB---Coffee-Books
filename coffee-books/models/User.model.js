const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
  places: [Schema.Types.ObjectId]
}, {
  timestamps: true
});

module.exports = model('User', userSchema);