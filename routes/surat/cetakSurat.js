const express = require('express')
const router = express.Router()
const cetakSurat = require('../../controllers/surat/cetakSurat')

router.get('/:jenisSurat/:id', cetakSurat.cetakSurat)

module.exports = router