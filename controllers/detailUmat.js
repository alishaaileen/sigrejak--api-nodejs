const db = require('../connection')

const getAll = async (req, res) => {
    try {
        let sql = `SELECT * FROM Detail_Umat`
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

const getByIdUmat = async (req, res) => {
    const { idUmat } = req.params

    try {
        let sql = 
            `SELECT * FROM Detail_Umat WHERE id_umat = ?`
        let result = await db(sql, [ idUmat ])


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
        id_umat,
        tgl_baptis,
        tgl_komuni,
        tgl_penguatan,
        file_akta_lahir,
        file_ktp,
        id_ayah,
        id_ibu,
        id_pasangan,
        cara_menikah,
        tgl_menikah,
    } = req.body

    try {
        let sql = `INSERT INTO Detail_Umat SET ?`
        let result = await db(sql, [ 
            {
                id_umat,
                tgl_baptis,
                tgl_komuni,
                tgl_penguatan,
                file_akta_lahir,
                file_ktp,
                id_ayah,
                id_ibu,
                id_pasangan,
                cara_menikah,
                tgl_menikah,
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
        id_umat,
        tgl_baptis,
        tgl_komuni,
        tgl_penguatan,
        file_akta_lahir,
        file_ktp,
        id_ayah,
        id_ibu,
        id_pasangan,
        cara_menikah,
        tgl_menikah,
    } = req.body
    let { idUmat } = req.params
    
    try {
        let sql = `SELECT * FROM Detail_Umat WHERE id_umat = ?`
        let result = await db(sql, [ idUmat ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE Detail_Umat SET ? WHERE id=?`
            result = await db(sql, [ {
                id_umat,
                tgl_baptis,
                tgl_komuni,
                tgl_penguatan,
                file_akta_lahir,
                file_ktp,
                id_ayah,
                id_ibu,
                id_pasangan,
                cara_menikah,
                tgl_menikah,
            }, idUmat ]) 
    
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
    let { idUmat } = req.params

    try {
        let sql = `SELECT * FROM Detail_Umat WHERE id_umat = ?`
        let result = await db(sql, [ idUmat ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =  `DELETE FROM Detail_Umat WHERE id=?`
            result = await db(sql, [ idUmat ])

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
    getByIdUmat,
    post,
    update,
    remove
}