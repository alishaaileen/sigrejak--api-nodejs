const express = require('express')
const router = express.Router()
const controller = require('../controllers/logSurat')

router.get('/', controller.getAll)
router.get('/:id_surat', controller.getByIdSurat)

module.exports = router