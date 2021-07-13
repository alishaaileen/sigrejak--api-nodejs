const express = require('express')
const router = express.Router()
const controller = require('../../controllers/surat/suratKeteranganPindah')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.get('/keluarga/:id', controller.getByIdKeluarga)
router.get('/lingkungan/:id', controller.getByIdLingkungan)
router.post('/add', controller.post)
router.patch('/verifikasi/:id', controller.verify)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router