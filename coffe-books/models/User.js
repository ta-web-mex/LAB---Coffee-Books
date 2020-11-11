const { Schema, model } = require("mongoose")

const userSchema = new Schema(
    {
        email: {
            type: String
        },
        password: {
            type: String
        },
        places: {
            type: Schema.Types.ObjectId,
            ref: "Place"
        },
        facebookID: String,
        googleID: String
    }
)

module.exports = model("User", userSchema)