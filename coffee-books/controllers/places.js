exports.placesView = (req, res) => {
    res.render("places", req.user)
}