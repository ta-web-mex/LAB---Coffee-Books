const {Router} = require('express')
const router = Router()

const {
  placeView,
  createView,
  createPost,
  editView,
  editPost,
  deletePlace
} = require('../controllers/private.controller')

router.get('/places', placeView)
router.get('/create', createView) 
router.post('/create', createPost)
router.get('/edit/:id', editView)
router.post('/edit/:idEdit', editPost)
router.get('/deletePlace/:id', deletePlace)


module.exports = router