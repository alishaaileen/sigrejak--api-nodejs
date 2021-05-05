const express = require('express')
const router = express.Router()
const parokiController = require('../controllers/paroki')

router.get('/', parokiController.getAll)
router.get('/:id', parokiController.getById)
router.post('/add', parokiController.post)
router.patch('/:id', parokiController.update)
router.delete('/:id', parokiController.remove)

module.exports = router