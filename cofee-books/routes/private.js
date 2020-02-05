const router = require('express').Router()
const {getAll, getDetail} = require('../controllers/privateControllers.js')

router.get('/create')
router.post('/create')

router.get('/update')
router.post('/update')

router.get('/delete')

router.get('/showall', getAll)

router.get('/place/:id', getDetail)
