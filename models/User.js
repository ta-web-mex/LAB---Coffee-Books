const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PLM = require('passport-local-mongoose');
const userSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    facebookId:{ type: String },
    places: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Places',
    },
  },
  { timestamps: true }
);
userSchema.plugin(PLM, { usernameField: 'email' });
const User = mongoose.model('User', userSchema);
module.exports = User;
