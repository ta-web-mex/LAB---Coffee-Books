exports.callbackRedirect = (req, res, next) => {
	res.redirect('/user/places');
};

exports.logout = (req, res, next) => {
	req.logout();
	res.redirect('/');
};
