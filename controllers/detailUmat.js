const db = require('../connection')
    , { v4: uuidv4 } = require('uuid')
    , { generateFileName } = require('../utils')
    , fs = require('fs')
    , path = require('path')

const getAll = async (req, res) => {
    try {
        let sql = `SELECT * FROM Detail_Umat`
        let result = await db(sql)

        res.status(200).send({
            message: "Success retrieving data",
            result: result,
        })
    } catch (error) {
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
        res.status(500).send({
            message: "Failed to retrieve data",
            error: error.message
        })
    }
}

const post = async (req, res) => {
    let id = uuidv4(),
        {
            id_umat,
            tgl_baptis,
            tgl_komuni,
            tgl_penguatan,
            file_akta_lahir,
            file_ktp,
            id_ayah,
            id_ibu,
        } = req.body

    try {
        let sql = `INSERT INTO Detail_Umat SET ?`
        let result = await db(sql, [ {
                id,
                id_umat,
                tgl_baptis,
                tgl_komuni,
                tgl_penguatan,
                file_akta_lahir,
                file_ktp,
                id_ayah,
                id_ibu,
            } ])
        
        res.status(200).send({
            message: "Success adding data",
            result: result,
        })
    } catch (error) {
        res.status(500).send({
            message: "Failed adding data",
            error: error.message,
        })
    }
}

const update = async (req, res) => {
    let {
        tgl_baptis,
        tgl_komuni,
        tgl_penguatan,
        id_ayah,
        id_ibu,
    } = req.body,
    file_akta_lahir = null,
    file_ktp = null
    if(req.files != null) {
        if(req.files.file_akta_lahir) {
            file_akta_lahir = req.files.file_akta_lahir
        } else {
            file_akta_lahir = req.body.file_akta_lahir
        }
        if(req.files.file_ktp) {
            file_ktp = req.files.file_ktp
        } else {
            file_ktp = req.body.file_ktp
        }
    }
    let { idUmat } = req.params

    let tempNamaAkta, tempNamaKtp
    
    try {
        let sql = `SELECT * FROM Detail_Umat WHERE id_umat = ?`
        let result = await db(sql, [ idUmat ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            let pathToFiles = `files/`
            if(typeof file_akta_lahir != 'string') { // ??????? gmn caranya biar bisa tau ga ada aplod an baru
                if(result[0].file_akta_lahir) {
                    fs.unlink(`${pathToFiles}${result[0].file_akta_lahir}`, (err) => {
                        if (err) {
                            console.error(err)
                            return res.status(500).send({
                                message: "Failed to change akta lahir",
                            })
                        }
                        console.log("file akta berhasil dihapus")
                    })
                }

                tempNamaAkta = generateFileName('akta-lahir', path.extname(file_akta_lahir.name))

                file_akta_lahir.mv(`${pathToFiles}${tempNamaAkta}`, (err) => {
                    if(err) {
                        console.log("akta error: "+err)
                        return res.status(500).send({
                            message: "Failed to save akta lahir",
                        })
                    }
                })
            }

            if(typeof file_ktp != 'string') {
                if(result[0].file_ktp) {
                    fs.unlink(`${pathToFiles}${result[0].file_ktp}`, (err) => {
                        if (err) {
                            console.error("ktp error: "+err)
                            return res.status(500).send({
                                message: "Failed to change ktp",
                            })
                        }
                        console.log("file ktp berhasil dihapus")
                    })
                }

                tempNamaKtp = generateFileName('ktp', path.extname(file_ktp.name))

                file_ktp.mv(`${pathToFiles}/${tempNamaKtp}`, (err) => {
                    if(err) {
                        console.log(err)
                        return res.status(500).send({
                            message: "Failed to save ktp",
                        })
                    }
                })
            }

            sql = `UPDATE Detail_Umat SET ? WHERE id_umat=?`
            result = await db(sql, [ {
                tgl_baptis,
                tgl_komuni,
                tgl_penguatan,
                file_akta_lahir: tempNamaAkta||null,
                file_ktp: tempNamaKtp||null,
                id_ayah,
                id_ibu,
            }, idUmat ]) 
    
            res.status(200).send({
                message: "Success updating data",
                result: result,
            })
        }
    } catch (error) {
        console.log(error)
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