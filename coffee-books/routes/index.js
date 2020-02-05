const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.redirect('/places/feeds')
});

router.get('/login', (req, res) => res.render('auth/login'))

module.exports = router;
