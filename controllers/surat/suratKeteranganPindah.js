const db = require('../../connection')
const { getTodayDate } = require('../../utils')

const getAll = async (req, res) => {
    try {
        let sql = `SELECT * FROM Surat_Keterangan_Pindah`
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
    const { id } = req.params

    try {
        let sql = 
            `SELECT * FROM Surat_Keterangan_Pindah WHERE id = ?`
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

const getByIdKeluarga = async (req, res) => {
    const { id } = req.params

    try {
        let sql = 
            `SELECT * FROM Surat_Keterangan_Pindah WHERE id_keluarga = ?`
        let result = await db(sql, [ id ])

        // if(result.length === 0) {
        //     res.status(404).send({
        //         message: "Data not found",
        //     })
        // } else {
            res.status(200).send({
                message: "Success retrieving data",
                result: result,
            })
        // }
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
        no_surat,
        id_keluarga,
        id_paroki_lama,
        id_lingkungan_lama,
        ketua_lingkungan,
        id_umat,
        alamat_lama,
        no_telp_lama,
        tgl_mulai_domisili,
        alamat_baru,
        no_telp_baru,
        id_lingkungan_baru,
        id_paroki_baru,
        ketua_lingkungan_approval,
    } = req.body
    let created_at = getTodayDate()

    try {
        let sql = `INSERT INTO Surat_Keterangan_Pindah SET ?`
        let result = await db(sql, [ 
            {
                no_surat,
                id_keluarga,
                id_paroki_lama,
                id_lingkungan_lama,
                ketua_lingkungan,
                id_umat,
                alamat_lama,
                no_telp_lama,
                tgl_mulai_domisili,
                alamat_baru,
                no_telp_baru,
                id_lingkungan_baru,
                id_paroki_baru,
                ketua_lingkungan_approval,
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
        no_surat,
        id_keluarga,
        id_paroki_lama,
        id_lingkungan_lama,
        ketua_lingkungan,
        id_umat,
        alamat_lama,
        no_telp_lama,
        tgl_mulai_domisili,
        alamat_baru,
        no_telp_baru,
        id_lingkungan_baru,
        id_paroki_baru,
        ketua_lingkungan_approval,
        id_sekretariat,
        sekretariat_approval,
        id_romo,
        romo_approval,
    } = req.body
    let updated_at = getTodayDate()
    let { id } = req.params
    
    try {
        let sql = `SELECT * FROM Surat_Keterangan_Pindah WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE Surat_Keterangan_Pindah SET ? WHERE id=?`
            result = await db(sql, [ {
                                        no_surat,
                                        id_keluarga,
                                        id_paroki_lama,
                                        id_lingkungan_lama,
                                        ketua_lingkungan,
                                        id_umat,
                                        alamat_lama,
                                        no_telp_lama,
                                        tgl_mulai_domisili,
                                        alamat_baru,
                                        no_telp_baru,
                                        id_lingkungan_baru,
                                        id_paroki_baru,
                                        ketua_lingkungan_approval,
                                        id_sekretariat,
                                        sekretariat_approval,
                                        id_romo,
                                        romo_approval,
                                        updated_at,
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
        let sql = `SELECT * FROM Surat_Keterangan_Pindah WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =  `DELETE FROM Surat_Keterangan_Pindah WHERE id=?`
            result = await db(sql, [ id ])

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
    getById,
    getByIdKeluarga,
    post,
    update,
    remove
}