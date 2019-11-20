const { model, Schema } = require('mongoose');

const placeSchema = new Schema(
	{
		name: String,
		placeType: {
			type: String,
			enum: [ 'coffee shop', 'bookstore' ]
		},
		location: {
			address: String,
			coordinates: [ Number ]
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

module.exports = model('Place', placeSchema);
