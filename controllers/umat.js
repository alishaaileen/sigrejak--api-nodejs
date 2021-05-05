const db = require('../connection')
const { getTodayDate } = require('../utils')

const getAll = async (req, res) => {
    try {
        let sql = `SELECT * FROM Umat WHERE deleted_at IS NULL`
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
        let sql = `SELECT * FROM Umat WHERE keluarga_id=?`
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
            `SELECT * FROM Umat
            WHERE id = ? AND deleted_at IS NULL`

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
    let created_at = getTodayDate()

    try {
        let sql =
            `INSERT INTO Umat SET ?`
        
        let result = await db(sql, [ 
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
                created_at,
            }
        ])
        
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
    let is_umat_active = 0

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