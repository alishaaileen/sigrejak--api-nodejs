const express = require('express')
const router = express.Router()
const izinPelayananController = require('../../controllers/surat/suratIzinPelayananEkaristi')

router.get('/', izinPelayananController.getAll)
router.get('/:id', izinPelayananController.getById)
router.get('/keluarga/:id', izinPelayananController.getByIdKeluarga)
router.get('/lingkungan/:id', izinPelayananController.getByIdLingkungan)
router.post('/add', izinPelayananController.post)
router.patch('/:id', izinPelayananController.update)
router.patch('/verifikasi/:id', izinPelayananController.verify)
router.delete('/:id', izinPelayananController.remove)

module.exports = router