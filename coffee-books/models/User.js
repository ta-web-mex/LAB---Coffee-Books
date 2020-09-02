const { Schema, model } = require("mongoose")

const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            //unique: true
        },
        password: String,
        places: [
            {
                type: Schema.Types.ObjectId,
                ref: "Place"
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = model("User", userSchema)