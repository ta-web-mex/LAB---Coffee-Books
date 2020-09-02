const Place = require("../models/Place")

exports.getIndex = async (req,res,next) => 
{
    let isLogged = false;

    if(req.user)
        isLogged = true
    
    const places = await Place.find().sort({ createdAt: 1 } )
    //console.log(places)

    res.render('index', {isLogged, places})
}