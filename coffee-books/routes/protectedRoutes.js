const { Router } = require("express")
const router = Router()

const { 
  createGet,
  createPost,
  placeGet,
  profileGet
} = require("../controllers/protectedControllers");

router
  .get('/create', createGet)
  .post('/create', createPost)
  .get('/place/:id', placeGet)
  .get('/profile', profileGet)

module.exports = router;
