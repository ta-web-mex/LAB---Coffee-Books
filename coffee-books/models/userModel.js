const {model, Schema} = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    googleID:{
        type:String
    },
    places:{
        type: [Schema.Types.ObjectId],
        ref: 'Place'
    }
});

userSchema.plugin(PLM, {usernameField: 'email'})
module.exports = model('User', userSchema);