const { Schema, model } = require("mongoose")

const userSchema = new Schema(
    {
        name: {
            type: String
    
        },
          email: {
             type: String,
             unique: true
        },
        photo: {
            type: String,
            default: "https://viciousmagazine.com/wp-content/uploads/2019/11/users/000000/lmd069d_dawnchorus.jpg"
        },
        password: {
            type: String
        },
        googleID: String,
        facebookID: String,
        places: {
            Type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Place"
                }
            ]
        }
    },
     {
        timestamps: true
      }
)

module.exports = model("User", userSchema)