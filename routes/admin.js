const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/', adminController.getAll)
router.get('/:id', adminController.getById)
router.post('/register', adminController.post)
router.patch('/:id', adminController.update)
router.delete('/:id', adminController.remove)

module.exports = router