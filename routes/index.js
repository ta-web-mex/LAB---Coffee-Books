const express = require('express');
const app = require('../app');
const passport = require('passport');
const Places = require('../models/places');
const router  = express.Router();
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended: false})

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// Hoja para pedir el login con google...
router.get('/login', (req, res, next)=> {res.render('login')})

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
)

router.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res){
  res.redirect('/')
})

router.get('/createplaces', (req, res, next) => {res.render('createplaces')})

router.post('/createplaces', urlencodedParser, function(req, res, next){

  var lugar = new Places({ name: req.body.name, location: req.body.location })

  lugar.save(function(err, doc){
    if(err) return console.error(err);

  }).then(res.redirect('/placeslist'))
  .catch(err => done(err))


 } )

module.exports = router;
