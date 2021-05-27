const express = require('express')
const router = express.Router()
const keteranganBeasiswaController = require('../../controllers/surat/suratKeteranganBeasiswa')

router.get('/', keteranganBeasiswaController.getAll)
router.get('/:id', keteranganBeasiswaController.getById)
router.get('/keluarga/:id', keteranganBeasiswaController.getByIdKeluarga)
router.post('/add', keteranganBeasiswaController.post)
router.patch('/:id', keteranganBeasiswaController.update)
router.delete('/:id', keteranganBeasiswaController.remove)

module.exports = router