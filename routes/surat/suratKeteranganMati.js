const express = require('express')
const router = express.Router()
const keteranganMatiController = require('../../controllers/surat/suratKeteranganMati')

router.get('/', keteranganMatiController.getAll)
router.get('/:id', keteranganMatiController.getById)
router.get('/lingkungan/:id', keteranganMatiController.getByIdLingkungan)
router.get('/keluarga/:id', keteranganMatiController.getByIdKeluarga)
router.post('/add', keteranganMatiController.post)
router.patch('/:id', keteranganMatiController.update)
router.delete('/:id', keteranganMatiController.remove)

module.exports = router