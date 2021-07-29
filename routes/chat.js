const express = require('express')
const router = express.Router()
const controller = require('../controllers/chat')

router.get('/history/:id_surat', controller.getByIdSurat)
router.get('/count-unread/:id_surat/:id_keluarga', controller.getCountUnreadChatByIdSurat)
router.post('/send', controller.post)
router.patch('/read/:id_surat/:id_keluarga', controller.readAllChat)

module.exports = router