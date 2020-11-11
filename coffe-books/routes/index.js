const express = require('express');
const router  = express.Router();





router.get('/',  (req, res, next) => {
  // if(req._destroy)
  console.log("aaaa" + req.session.currentUser)
  if (req.session.currentUser) {
    
    console.log("Logged")
    res.render("auth/index", {
      user: req.session.currentUser
    })
  } else {
    console.log("Not logges")
    res.render('index');
  }
  
});


module.exports = router;
