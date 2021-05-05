const express = require('express')
const router = express.Router()
const umatController = require('../controllers/umat')

router.get('/', umatController.getAll)
router.get('/keluarga/:idFamily', umatController.getFamilyMember)
router.get('/:id', umatController.getById)
router.post('/add', umatController.post)
router.patch('/:id', umatController.update)
router.delete('/:id', umatController.remove)

module.exports = router