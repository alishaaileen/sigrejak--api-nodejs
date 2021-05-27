const express = require('express')
const router = express.Router()
const keteranganController = require('../../controllers/surat/suratKeterangan')

router.get('/', keteranganController.getAll)
router.get('/:id', keteranganController.getById)
router.get('/keluarga/:id', keteranganController.getByIdKeluarga)
router.post('/add', keteranganController.post)
router.patch('/:id', keteranganController.update)
router.delete('/:id', keteranganController.remove)

module.exports = router