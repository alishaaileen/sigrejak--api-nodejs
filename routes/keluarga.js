const express = require('express')
const router = express.Router()
const keluargaController = require('../controllers/keluarga')

// Middleware
const { validateToken } = require('../middleware/authMiddleware')

router.get('/', validateToken, keluargaController.getAll)
router.get('/:id', validateToken, keluargaController.getById)
router.post('/register', validateToken, keluargaController.post)
router.patch('/:id', validateToken, keluargaController.update)
router.delete('/:id', validateToken, keluargaController.remove)

router.post('/login', keluargaController.login)

module.exports = router