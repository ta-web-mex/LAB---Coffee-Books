const express = require("express")
const Place = require('../models/Place')
const User = require('../models/User')
const router = express.Router()
const {
  facebookInit,
  facebookCb,
  logout,
  googleInit,
  googleCb
} = require('../controllers/auth')
const {
  addNewPlace,
  removePlace
} = require('../controllers/places')

/* GET home page */
router.get('/', async (req, res) => {
  const places = await Place.find()
  
  try {
    const userData = await User.findById(req.user._id).populate('places')

    res.render('index', { 
      token : process.env.TOKEN,
      user : userData,
      places: places
    })
  } catch (error) {
    console.log(error)
    res.render('index', { 
      token : process.env.TOKEN ,
      places : places
    });
  }
});

// ================ AUTH =====================
router.get('/logout', logout)

router.get("/auth/facebook", facebookInit)
router.get("/auth/facebook/callback", facebookCb)

router.get("/auth/google", googleInit)
router.get("/auth/google/callback", googleCb)

//================= PLACES ======================

router.post('/place/add', addNewPlace)
router.get('/place/delete/:id', removePlace)

module.exports = router;
