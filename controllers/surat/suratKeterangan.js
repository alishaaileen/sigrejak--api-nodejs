const db = require('../../connection')
const { getTodayDate, generateNomorSurat } = require('../../utils')

const getAll = async (req, res) => {
    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.ketua_lingkungan,
                    S.id_umat,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.pekerjaan,
                    S.pendidikan,
                    S.id_ortu,
                    O.nama AS nama_ortu,
                    O.alamat AS alamat_ortu,
                    S.keperluan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.id_romo,
                    S.romo_approval,
                    S.created_at,
                    S.updated_at,
                    S.deleted_at
            FROM Surat_Keterangan S JOIN Umat U on (S.id_umat=U.id)
            JOIN (SELECT * FROM Umat) O ON (S.id_ortu=O.id)`
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
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.ketua_lingkungan,
                    S.id_umat,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.pekerjaan,
                    S.pendidikan,
                    S.id_ortu,
                    O.nama AS nama_ortu,
                    O.alamat AS alamat_ortu,
                    S.keperluan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.id_romo,
                    S.romo_approval,
                    S.created_at,
                    S.updated_at,
                    S.deleted_at
            FROM Surat_Keterangan S JOIN Umat U on (S.id_umat=U.id) 
                JOIN (SELECT * FROM Umat) O ON (S.id_ortu=O.id) 
            WHERE S.id = ?`
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
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.ketua_lingkungan,
                    S.id_umat,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.pekerjaan,
                    S.pendidikan,
                    S.id_ortu,
                    O.nama AS nama_ortu,
                    O.alamat AS alamat_ortu,
                    S.keperluan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.id_romo,
                    S.romo_approval,
                    S.created_at,
                    S.updated_at,
                    S.deleted_at
            FROM Surat_Keterangan S JOIN Umat U on (S.id_umat=U.id) 
                JOIN (SELECT * FROM Umat) O ON (S.id_ortu=O.id) 
            WHERE S.id_keluarga = ?`
            let result = await db(sql, [ id ])

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

const post = async (req, res) => {
    let no_surat = generateNomorSurat('F3'),
        {
            id_keluarga,
            id_lingkungan,
            ketua_lingkungan,
            id_umat,
            pendidikan,
            id_ortu,
            keperluan,
            isKetuaLingkungan,
        } = req.body,
        created_at = getTodayDate(),
        id_sekretariat = null,
        sekretariat_approval = null,
        id_romo = null,
        romo_approval = null
        ketua_lingkungan_approval = isKetuaLingkungan ? 1 : 0
        if(!isKetuaLingkungan) ketua_lingkungan = null

    try {
        let sql = `INSERT INTO Surat_Keterangan SET ?`
        let result = await db(sql, [ 
            {
                no_surat,
                id_keluarga,
                id_lingkungan,
                ketua_lingkungan,
                id_umat,
                pendidikan,
                id_ortu,
                keperluan,
                ketua_lingkungan,
                ketua_lingkungan_approval,
                id_sekretariat,
                sekretariat_approval,
                id_romo,
                romo_approval,
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
        id_lingkungan,
        ketua_lingkungan,
        id_umat,
        pendidikan,
        id_ortu,
        keperluan,
        ketua_lingkungan_approval,
        id_sekretariat,
        sekretariat_approval,
        id_romo,
        romo_approval,
    } = req.body
    let updated_at = getTodayDate()
    let { id } = req.params
    
    try {
        let sql = `SELECT * FROM Surat_Keterangan WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE Surat_Keterangan SET ? WHERE id=?`
            result = await db(sql, [ {
                                        no_surat,
                                        id_keluarga,
                                        id_lingkungan,
                                        ketua_lingkungan,
                                        id_umat,
                                        pendidikan,
                                        id_ortu,
                                        keperluan,
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
    let { id } = req.params,
        deleted_at = getTodayDate()

    try {
        let sql = `SELECT * FROM Surat_Keterangan WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =  `UPDATE Surat_Keterangan SET ? WHERE id=?`
            result = await db(sql, [ { deleted_at }, id ])

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