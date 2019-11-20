const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  email: String,
  places: {
    type: Schema.Types.ObjectId,
    ref: "Place"},
  },
    {
      timestamps: true,
      versionKey: false
    }
);

module.exports = model("User", User);
