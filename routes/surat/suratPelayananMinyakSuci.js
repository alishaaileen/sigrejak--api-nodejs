const express = require('express')
const router = express.Router()
const minyakSuciController = require('../../controllers/surat/suratPelayananMinyakSuci')

router.get('/', minyakSuciController.getAll)
router.get('/:id', minyakSuciController.getById)
router.get('/keluarga/:id', minyakSuciController.getByIdKeluarga)
router.get('/lingkungan/:id', minyakSuciController.getByIdLingkungan)
router.post('/add', minyakSuciController.post)
router.patch('/:id', minyakSuciController.update)
router.delete('/:id', minyakSuciController.remove)

module.exports = router