const router = require('express').Router()
const passport = require('passport')
const {callbackRedirect, logout, SignUp, LogIn } = require('../controllers/authController')

router.get('/signup', SignUp)
//router.get('/login', LogIn)
router.get('/login', passport.authenticate('facebook'))
//router.get('/login', passport.authenticate('google'))
//router.get('/auth/google-cb', passport.authenticate('google'), callbackRedirect)
router.get('/callback', passport.authenticate('facebook'), callbackRedirect)


//delete and edit

router.post("/places/:id/delete", (req, res) => {
    const {id} = req.params
    Place.findByIdAndDelete(id)
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
  })
  
  router.get('/places/:id/edit', (req, res) => {
    const { id } = req.params;
    Place.findById(id)
      .then((place) => {
        res.render('user/update-delete', { place });
      })
      .catch((err) => console.log(err));
  });
  
  router.post('/places/:id/edit', (req, res) => {
    const { id } = req.params;
    console.log({...req.body})
    Place.findByIdAndUpdate(id, {	$set: {...req.body}}, { new: true })
      .then((place) => res.redirect(`/places/${place._id}/edit`))
      .catch((err) => console.log(err));
  });

// //Logout
router.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
  });


module.exports = router;
