const {model, Schema} =  require('mongoose');

const placeSchema = new Schema(
  {
    name: String,
    placeType:{
        type: String,
        enum: ['coffe-shop', 'bookstore']
    },
    location: {
        address: String,
        coordinates: [Number]
    },
    author:{
      type: Schema.Types.ObjectId,
      ref:"User"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);


module.exports = model("Place", placeSchema);