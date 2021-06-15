const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

// Middleware
const { validateToken } = require('../middleware/authMiddleware')

router.get('/', validateToken, adminController.getAll)
router.get('/role/:roleId', validateToken, adminController.getAllByRole)
router.get('/:id', validateToken, adminController.getById)
router.post('/register', validateToken, adminController.post)
router.patch('/set-romo-paroki', validateToken, adminController.setAsRomoParoki)
router.patch('/:id', validateToken, adminController.update)
router.delete('/:id', validateToken, adminController.remove)

router.post('/login', adminController.login)
router.post('/change-pw', adminController.changePassword)

module.exports = router