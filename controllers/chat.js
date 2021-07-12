const db = require('../connection')
    , { v4: uuidv4 } = require('uuid')
    , { getDateTime } = require('../utils')
    , tableName = 'Chat'

const getByIdSurat = async (req, res) => {
    let { id_surat } = req.params

    try {
        let sql = `SELECT * FROM ${tableName} WHERE id_surat=? ORDER BY waktu_kirim ASC`
        let result = await db(sql, [ id_surat ])

        res.status(200).send({
            message: "Success retrieving data",
            result: result,
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed to retrieve data",
            error: error.message
        })
    }
}

const getCountUnreadChatByIdSurat = async (req, res) => {
    let { id_surat } = req.params

    try {
        let sql = `SELECT COUNT(id) AS count_unread FROM ${tableName} WHERE id_surat=? AND ${tableName}.read != 1`
        let result = await db(sql, [ id_surat ])

        res.status(200).send({
            message: "Success counting unread chat",
            result: result,
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed to retrieve data",
            error: error.message
        })
    }
}

const post = async (req, res) => {
    let id = uuidv4(),
        waktu_kirim = getDateTime(),
        read = 0,
        { id_surat, pengirim, teks } = req.body

    try {
        let sql = `INSERT INTO ${tableName} SET ?`
        let result = await db(sql, [ 
            {
                id,
                id_surat,
                pengirim,
                teks,
                waktu_kirim,
                read,
            }
        ])
        
        res.status(200).send({
            message: "Chat sent",
            result: result,
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed to send chat",
            error: error.message,
        })
    }
}

const readAllChat = async (req, res) => {
    let { id_surat } = req.params

    try {
        let sql = `UPDATE ${tableName} SET ? WHERE id_surat=? AND ${tableName}.read=0`
        let result = await db(sql, [ { read: 1 }, id_surat ])
        
        res.status(200).send({
            message: "Success update read chat",
            result: result,
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed update read chat",
            error: error.message,
        })
    }
}

module.exports = {
    getByIdSurat,
    getCountUnreadChatByIdSurat,
    post,
    readAllChat,
}