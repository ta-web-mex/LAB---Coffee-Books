const {model, Schema} = require('mongoose');

const placeSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    location: {
        address:{
          type: String,
          required: true
        },
        coordinates:{
          type: [Number],
          required: true
        }
    },
    placeType:{
        type: String,
        enum:['coffee shop', 'book store']
    }
});

module.exports = model('Place', placeSchema);