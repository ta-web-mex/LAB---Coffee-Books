const Place = require('../models/Place');
const User = require('../models/User');

exports.createGet = (_, res) => {
	res.render('user/create');
};

exports.createPost = async (req, res, next) => {
	const { id } = req.user;
	console.log(req.body);
	const place = await Place.create({ ...req.body, user: id });
	Place.find({ user: id })
		.then((places) => {
			console.log(places);
			User.findByIdAndUpdate({ _id: id }, { places: places })
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
	res.redirect('/');
};

exports.getPlaces = (req, res) => {
	const { id } = req.user;
	Place.find({ user: id })
		.then((places) => {
			const { placesArr } = places;
			res.render('user/places', { placesArr });
		})
		.catch((err) => console.log(err));
};
