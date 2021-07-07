const express = require('express')
const router = express.Router()
const keteranganBeasiswaController = require('../../controllers/surat/suratKeteranganBeasiswa')

router.get('/', keteranganBeasiswaController.getAll)
router.get('/:id', keteranganBeasiswaController.getById)
router.get('/keluarga/:id', keteranganBeasiswaController.getByIdKeluarga)
router.get('/lingkungan/:id', keteranganBeasiswaController.getByIdLingkungan)
router.post('/add', keteranganBeasiswaController.post)
router.patch('/:id', keteranganBeasiswaController.update)
router.patch('/verifikasi/:id', keteranganBeasiswaController.verify)
router.delete('/:id', keteranganBeasiswaController.remove)

module.exports = router