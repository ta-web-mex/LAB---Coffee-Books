const {model, Schema} = require('mongoose')
console.log('estoy entrando');

const placeSchema = new Schema(
  {
    name:String,
    placeType:String,
    location: {
      address: String,
      coordinates: [Number]
    }

  },{
    timestamps:true,
    versionKey:false
  }
  )
  console.log('estoy entrando');

module.exports = model('place', placeSchema)