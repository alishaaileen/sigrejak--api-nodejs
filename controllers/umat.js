const db = require('../connection')
    , { v4: uuidv4 } = require('uuid')
    , { getTodayDate } = require('../utils')
    , DetailUmatController = require('./detailUmat')

const getAll = async (req, res) => {
    try {
        let sql = 
            `SELECT U.id,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.jenis_kelamin,
                    U.nama_baptis,
                    U.alamat,
                    U.no_telp,
                    U.pekerjaan,
                    U.is_dead,
                    U.is_umat_active,
                    U.keluarga_id,
                    U.lingkungan_id,
                    DATE_FORMAT(U.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(U.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(U.deleted_at, '%d-%m-%Y') AS deleted_at,
                    L.nama_lingkungan,
                    L.ketua_lingkungan_id,
                    K.nama_keluarga
             FROM Umat U JOIN Lingkungan L ON (U.lingkungan_id=L.id)
             JOIN Keluarga K ON (U.keluarga_id=K.id) 
             WHERE U.deleted_at IS NULL`
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

const getFamilyMember = async (req, res) => {
    let { idFamily } = req.params

    try {
        let sql = 
            `SELECT U.id,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.jenis_kelamin,
                    U.nama_baptis,
                    U.alamat,
                    U.no_telp,
                    U.pekerjaan,
                    U.is_dead,
                    U.is_umat_active,
                    U.keluarga_id,
                    U.lingkungan_id,
                    L.nama_lingkungan,
                    L.ketua_lingkungan_id,
                    K.nama_keluarga,
                    DATE_FORMAT(U.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(U.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(U.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM Umat U JOIN Lingkungan L ON (U.lingkungan_id=L.id)
            JOIN Keluarga K ON (U.keluarga_id=K.id) 
            WHERE U.keluarga_id=?`
        let result = await db(sql, [ idFamily ])

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

const getById = async (req, res) => {
    let { id } = req.params

    try {
        let sql = 
            `SELECT U.id,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.jenis_kelamin,
                    U.nama_baptis,
                    U.alamat,
                    U.no_telp,
                    U.pekerjaan,
                    U.is_dead,
                    U.is_umat_active,
                    U.keluarga_id,
                    U.lingkungan_id,
                    L.nama_lingkungan,
                    L.ketua_lingkungan_id,
                    K.nama_keluarga,
                    DATE_FORMAT(U.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(U.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(U.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM Umat U JOIN Lingkungan L ON (U.lingkungan_id=L.id)
            JOIN Keluarga K ON (U.keluarga_id=K.id) 
            WHERE U.id = ?`

        let result = await db(sql, [ id ])

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

const post = async (req, res) => {
    let id = uuidv4(),
        {
            nama,
            tempat_lahir,
            tgl_lahir,
            jenis_kelamin,
            nama_baptis,
            alamat,
            no_telp,
            pekerjaan,
            is_dead,
            is_umat_active,
            keluarga_id,
            lingkungan_id,
        } = req.body
    let created_at = getTodayDate()

    try {
        let sql = `INSERT INTO Umat SET ?`
        
        let result = await db(sql, [ {
                id,
                nama,
                tempat_lahir,
                tgl_lahir,
                jenis_kelamin,
                nama_baptis,
                alamat,
                no_telp,
                pekerjaan,
                is_dead,
                is_umat_active,
                keluarga_id,
                lingkungan_id,
                created_at,
            } ])
        
        // Buat detail umat
        DetailUmatController.post(id)
        
        res.status(200).send({
            message: "Success adding data",
            result: result,
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed adding data",
            error: error.message,
        })
    }
}

const update = async (req, res) => {
    let {
        nama,
        tempat_lahir,
        tgl_lahir,
        jenis_kelamin,
        nama_baptis,
        alamat,
        no_telp,
        pekerjaan,
        is_dead,
        is_umat_active,
        keluarga_id,
        lingkungan_id,
    } = req.body
    let updated_at = getTodayDate()
    let { id } = req.params
    
    try {
        let sql =
            `SELECT * FROM Umat 
            WHERE id = ? AND deleted_at IS NULL`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =
                `UPDATE Umat SET ?
                WHERE id=? AND deleted_at IS NULL`
            
            result = await db(sql, [ {
                nama,
                tempat_lahir,
                tgl_lahir,
                jenis_kelamin,
                nama_baptis,
                alamat,
                no_telp,
                pekerjaan,
                is_dead,
                is_umat_active,
                keluarga_id,
                lingkungan_id,
                updated_at
            }, id ]) 
    
            res.status(200).send({
                message: "Success updating data",
                result: result,
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed updating data",
            error: error.message,
        })
    }
}

const remove = async (req, res) => {
    let { id } = req.params
    let deleted_at = getTodayDate()

    try {
        let sql =
            `SELECT * FROM Umat 
            WHERE id = ? AND deleted_at IS NULL`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = 
                `UPDATE Umat SET ?
                WHERE id=? AND deleted_at IS NULL`
            
            let result = db(sql, [ { deleted_at }, id ])

            res.status(200).send({
                message: "Success deleting data",
                result: result,
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed deleting data",
            error: error.message,
        })
    }
}

module.exports = {
    getAll,
    getFamilyMember,
    getById,
    post,
    update,
    remove
}