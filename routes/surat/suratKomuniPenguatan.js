const express = require('express')
const router = express.Router()
const komuniPenguatanController = require('../../controllers/surat/suratKomuniPenguatan')

router.get('/', komuniPenguatanController.getAll)
router.get('/:id', komuniPenguatanController.getById)
router.get('/keluarga/:id', komuniPenguatanController.getByIdKeluarga)
router.get('/lingkungan/:id', komuniPenguatanController.getByIdLingkungan)
router.post('/add', komuniPenguatanController.post)
router.patch('/:id', komuniPenguatanController.update)
router.patch('/verifikasi/:id', komuniPenguatanController.verify)
router.delete('/:id', komuniPenguatanController.remove)

module.exports = router