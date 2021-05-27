const express = require('express')
const router = express.Router()
const lingkunganController = require('../controllers/lingkungan')

router.get('/', lingkunganController.getAll)
router.get('/:id', lingkunganController.getById)
router.get('/ketua/:id', lingkunganController.getByKetuaLingkunganId)
router.post('/add', lingkunganController.post)
router.patch('/:id', lingkunganController.update)
router.delete('/:id', lingkunganController.remove)

module.exports = router