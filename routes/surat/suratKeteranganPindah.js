const express = require('express')
const router = express.Router()
const keteranganPindahController = require('../../controllers/surat/suratKeteranganPindah')

router.get('/', keteranganPindahController.getAll)
router.get('/:id', keteranganPindahController.getById)
router.get('/keluarga/:id', keteranganPindahController.getByIdKeluarga)
router.post('/add', keteranganPindahController.post)
router.patch('/:id', keteranganPindahController.update)
router.delete('/:id', keteranganPindahController.remove)

module.exports = router