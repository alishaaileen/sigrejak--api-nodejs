const db = require('../connection')

const getAll = async (req, res) => {
    try {
        let sql =
            `SELECT L.id,
                    L.ketua_lingkungan_id,
                    L.nama_lingkungan,
                    K.nama_keluarga "ketua_lingkungan",
                    K.username,
                    K.email
            FROM Lingkungan L JOIN Keluarga K ON (L.ketua_lingkungan_id=K.id)`
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

const getById = async (req, res) => {
    let { id } = req.params

    try {
        let sql = 
            `SELECT L.id,
                    L.ketua_lingkungan_id,
                    L.nama_lingkungan,
                    K.nama_keluarga "ketua_lingkungan",
                    K.username,
                    K.email
            FROM Lingkungan L JOIN Keluarga K ON (L.ketua_lingkungan_id=K.id) 
            WHERE L.id=?`
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
        nama_lingkungan,
        ketua_lingkungan_id,
    } = req.body

    try {
        let sql =
            `INSERT INTO Lingkungan SET ?`
        let result = await db(sql, [ 
            {
                nama_lingkungan,
                ketua_lingkungan_id,
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
        nama_lingkungan,
        ketua_lingkungan_id,
    } = req.body
    let { id } = req.params
    
    try {
        let sql = `SELECT * FROM Lingkungan WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE Lingkungan SET ? WHERE id=?`
            
            result = await db(sql, [ {
                nama_lingkungan,
                ketua_lingkungan_id,
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

    try {
        let sql = `SELECT * FROM Lingkungan WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `SELECT * FROM Umat WHERE lingkungan_id=?`
            result = await db(sql, [ id ])

            if(result.length === 0) {
                sql =  `DELETE FROM Lingkungan WHERE id=?`
                result = await db(sql, [ id ])
    
                res.status(200).send({
                    message: "Success deleting data",
                    result: result,
                })
            } else {
                res.status(409).send({
                    message: "Cannot delete data. Please empty all umat in lingkungan first",
                    result: result
                })
            }
            
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
    getById,
    post,
    update,
    remove
}