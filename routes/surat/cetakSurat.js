const express = require('express')
const router = express.Router()
const suratKeterangan = require('../../controllers/surat/cetakSurat/suratKeterangan')

router.get('/surat-keterangan/:id', suratKeterangan.cetakSuratKeterangan)

module.exports = router