const { model, Schema } = require("mongoose");

const placeSchema = new Schema(
  {
    name: String,
    location: {
        address: String,
        coordinates: [Number]
    },
    placeType: {
        type:String,
        enum:['coffee shop', 'bookstore']
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model("Place", placeSchema);