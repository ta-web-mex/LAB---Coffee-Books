const mongoose = require("mongoose")
const Schema = mongoose.Schema
const model = mongoose.model
const PLM = require("passport-local-mongoose")

const placeSchema = new Schema ({
  name: String, 
  location: {},
  placeType: String,
  enum:["coffe shop", "bookstore"]
    
})

module.exports= model("Place", placeSchema)