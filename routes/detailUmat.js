const express = require('express')
const router = express.Router()
const detailUmatController = require('../controllers/detailUmat')

router.get('/', detailUmatController.getAll)
router.get('/:idUmat', detailUmatController.getByIdUmat)
router.post('/add', detailUmatController.post)
router.patch('/:idUmat', detailUmatController.update)
router.delete('/:idUmat', detailUmatController.remove)

module.exports = router