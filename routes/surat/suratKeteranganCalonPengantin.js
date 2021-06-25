const express = require('express')
const router = express.Router()
const controller = require('../../controllers/surat/suratKeteranganCalonPengantin')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.get('/keluarga/:id', controller.getByIdKeluarga)
router.get('/lingkungan/:id', controller.getByIdLingkungan)
router.post('/add', controller.post)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router