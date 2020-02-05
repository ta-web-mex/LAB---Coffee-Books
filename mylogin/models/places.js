const {model, Schema} = require('mongoose')

const placeSchema = new Schema(
  {
    name:String,
    location:String,
    placeType:['Barberia', 'Cienma', 'Mall', 'Bar', 'Parque', 'Escuela']
  },{
    timestamps:true,
    versionKey:true
  }
)

module.exports = model('place', placeSchema)