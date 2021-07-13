const db = require('../connection')
    , { v4: uuidv4 } = require('uuid')

const { getDateTime } = require('../utils')
    , tableName = 'Log_Surat'

const getAll = async (req, res) => {
    try {
        let sql = `SELECT * FROM ${tableName} ORDER BY waktu DESC`
        let result = await db(sql)

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

const getByIdSurat = async (req, res) => {
    let { id_surat } = req.params

    try {
        let sql = `SELECT * FROM ${tableName} WHERE id_surat=? ORDER BY waktu DESC`
        let result = await db(sql, [ id_surat ])

        if(result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            res.status(200).send({
                message: "Success retrieving data",
                result: result,
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed to retrieve data",
            error: error.message
        })
    }
}

const post = async (id_surat, kejadianId, roleId = 0) => {
    let id = uuidv4(),
        waktu = getDateTime(),
        kejadianList = [
            'Pengajuan surat dilakukan', // 0
            'Data surat diubah', // 1
            'Surat diverifikasi', // 2
            'Surat dihapus', // 3
        ],
        roleList = [
            'Keluarga', // 0
            'Ketua Lingkungan', // 1
            'Sekretariat', // 2
            'Romo Paroki', // 3
            'Imam', // 4
            'Pastor Pelayan' // 5 - Pastor
        ]

    try {
        let sql = `INSERT INTO ${tableName} SET ?`
        await db(sql, [ 
            {
                id,
                id_surat,
                role_pelaku: roleList[roleId],
                kejadian: kejadianList[kejadianId],
                waktu,
            }
        ])
        
        return true
    } catch (error) {
        console.log(error.message)
        return false
    }
}

module.exports = {
    getAll,
    getByIdSurat,
    post,
}