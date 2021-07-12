const express = require('express')
const router = express.Router()
const controller = require('../controllers/chat')

router.get('/history/:id_surat', controller.getByIdSurat)
router.get('/count-unread/:id_surat', controller.getCountUnreadChatByIdSurat)
router.post('/send', controller.post)
router.patch('/read/:id_surat', controller.readAllChat)

module.exports = router