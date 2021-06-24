const express = require('express')
const router = express.Router()
const baptisAnakController = require('../../controllers/surat/suratBaptisAnak')

router.get('/', baptisAnakController.getAll)
router.get('/:id', baptisAnakController.getById)
router.get('/keluarga/:id', baptisAnakController.getByIdKeluarga)
router.get('/lingkungan/:id', baptisAnakController.getByIdLingkungan)
router.post('/add', baptisAnakController.post)
router.patch('/:id', baptisAnakController.update)
router.delete('/:id', baptisAnakController.remove)

module.exports = router