const { model, Schema } = require('mongoose');

const userSchema = new Schema(
	{
		name: String,
		email: String,
		facebookId: String,
		googleId: String,
		places: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Place'
			}
		]
	},
	{
		timestamps: true,
		versionKey: false
	}
);

module.exports = model('User', userSchema);
