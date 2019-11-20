const Place = require('../models/Place');

exports.createGet = (_, res) => {
	res.render('user/create');
};

exports.createPost = async (req, res, next) => {
	const { _id } = req.user;
	console.log(req.body);
	const place = await Place.create({ ...req.body, user: _id });
	res.redirect('/');
};
