const db = require('../../connection')
    , { v4: uuidv4 } = require('uuid')
    , { getTodayDate, getDateTime, generateNomorSurat } = require('../../utils')
    , tableName = 'Surat_Pelayanan_Minyak_Suci'

const getAll = async (req, res) => {
    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.nama_keluarga_penanggung_jawab,
                    S.alamat_keluarga_penanggung_jawab,
                    S.no_telp_keluarga_penanggung_jawab,
                    S.nama,
                    S.nama_baptis,
                    S.tempat_lahir,
                    S.tgl_lahir,
                    S.alamat,
                    S.nama_pasangan,
                    S.cara_menikah,
                    S.tahun_menikah,
                    S.status_terima_minyak,
                    S.tgl_terima_minyak,
                    S.id_pastor_pelayan,
                    R.nama_pastor_pelayan,
                    S.pastor_pelayan_approval,
                    S.pastor_pelayan_approval_stamp,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval_stamp,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM ${tableName} S JOIN (SELECT id AS id_pastor_pelayan, nama AS nama_pastor_pelayan FROM Admin) R ON (S.id_pastor_pelayan=R.id_pastor_pelayan)`
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
                    S.nama_keluarga_penanggung_jawab,
                    S.alamat_keluarga_penanggung_jawab,
                    S.no_telp_keluarga_penanggung_jawab,
                    S.nama,
                    S.nama_baptis,
                    S.tempat_lahir,
                    S.tgl_lahir,
                    S.alamat,
                    S.nama_pasangan,
                    S.cara_menikah,
                    S.tahun_menikah,
                    S.status_terima_minyak,
                    S.tgl_terima_minyak,
                    S.id_pastor_pelayan,
                    R.nama_pastor_pelayan,
                    S.pastor_pelayan_approval,
                    S.pastor_pelayan_approval_stamp,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval_stamp,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM ${tableName} S JOIN (SELECT id AS id_pastor_pelayan, nama AS nama_pastor_pelayan FROM Admin) R ON (S.id_pastor_pelayan=R.id_pastor_pelayan)
            WHERE S.id = ?`
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

const getByIdKeluarga = async (req, res) => {
    const { id } = req.params

    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.nama_keluarga_penanggung_jawab,
                    S.alamat_keluarga_penanggung_jawab,
                    S.no_telp_keluarga_penanggung_jawab,
                    S.nama,
                    S.nama_baptis,
                    S.tempat_lahir,
                    S.tgl_lahir,
                    S.alamat,
                    S.nama_pasangan,
                    S.cara_menikah,
                    S.tahun_menikah,
                    S.status_terima_minyak,
                    S.tgl_terima_minyak,
                    S.id_pastor_pelayan,
                    R.nama_pastor_pelayan,
                    S.pastor_pelayan_approval,
                    S.pastor_pelayan_approval_stamp,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval_stamp,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM ${tableName} S JOIN (SELECT id AS id_pastor_pelayan, nama AS nama_pastor_pelayan FROM Admin) R ON (S.id_pastor_pelayan=R.id_pastor_pelayan)
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

const getByIdLingkungan = async (req, res) => {
    const { id } = req.params

    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.nama_keluarga_penanggung_jawab,
                    S.alamat_keluarga_penanggung_jawab,
                    S.no_telp_keluarga_penanggung_jawab,
                    S.nama,
                    S.nama_baptis,
                    S.tempat_lahir,
                    S.tgl_lahir,
                    S.alamat,
                    S.nama_pasangan,
                    S.cara_menikah,
                    S.tahun_menikah,
                    S.status_terima_minyak,
                    S.tgl_terima_minyak,
                    S.id_pastor_pelayan,
                    R.nama_pastor_pelayan,
                    S.pastor_pelayan_approval,
                    S.pastor_pelayan_approval_stamp,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval_stamp,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM ${tableName} S JOIN (SELECT id AS id_pastor_pelayan, nama AS nama_pastor_pelayan FROM Admin) R ON (S.id_pastor_pelayan=R.id_pastor_pelayan)
            WHERE S.id_lingkungan = ?`
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
    let id = uuidv4(),
        {
            id_keluarga,
            id_lingkungan,
            nama_keluarga_penanggung_jawab,
            alamat_keluarga_penanggung_jawab,
            no_telp_keluarga_penanggung_jawab,
            nama,
            nama_baptis,
            tempat_lahir,
            tgl_lahir,
            alamat,
            cara_menikah,
            tahun_menikah,
            status_terima_minyak,
            tgl_terima_minyak,
            nama_pasangan,
            id_pastor_pelayan,
            ketua_lingkungan,
            isKetuaLingkungan,
        } = req.body,
        created_at = getTodayDate(),
        ketua_lingkungan_approval = 0,
        ketua_lingkungan_approval_stamp = null,
        no_surat = await generateNomorSurat('F9', kode_lingkungan, tableName)

    if(isKetuaLingkungan === true) {
        ketua_lingkungan_approval = 1
        ketua_lingkungan_approval_stamp = getDateTime()
    } else {
        ketua_lingkungan = null
    }

    try {
        let sql = `INSERT INTO ${tableName} SET ?`
        let result = await db(sql, [
            {
                id,
                no_surat,
                id_keluarga,
                id_lingkungan,
                nama_keluarga_penanggung_jawab,
                alamat_keluarga_penanggung_jawab,
                no_telp_keluarga_penanggung_jawab,
                nama,
                nama_baptis,
                tempat_lahir,
                tgl_lahir,
                alamat,
                cara_menikah,
                tahun_menikah,
                status_terima_minyak,
                tgl_terima_minyak,
                nama_pasangan,
                id_pastor_pelayan,
                ketua_lingkungan,
                ketua_lingkungan_approval,
                ketua_lingkungan_approval_stamp,
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
        id_lingkungan,
        id_keluarga,
        nama_keluarga_penanggung_jawab,
        alamat_keluarga_penanggung_jawab,
        no_telp_keluarga_penanggung_jawab,
        nama,
        nama_baptis,
        tempat_lahir,
        tgl_lahir,
        alamat,
        cara_menikah,
        tahun_menikah,
        status_terima_minyak,
        tgl_terima_minyak,
        nama_pasangan,
        id_pastor_pelayan,
    } = req.body
    let updated_at = getTodayDate()
    let { id } = req.params
    
    try {
        let sql = `SELECT * FROM ${tableName} WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE ${tableName} SET ? WHERE id=?`
            result = await db(sql, [ {
                                        no_surat,
                                        id_keluarga,
                                        id_lingkungan,
                                        id_keluarga,
                                        nama_keluarga_penanggung_jawab,
                                        alamat_keluarga_penanggung_jawab,
                                        no_telp_keluarga_penanggung_jawab,
                                        nama,
                                        nama_baptis,
                                        tempat_lahir,
                                        tgl_lahir,
                                        alamat,
                                        cara_menikah,
                                        tahun_menikah,
                                        status_terima_minyak,
                                        tgl_terima_minyak,
                                        nama_pasangan,
                                        id_pastor_pelayan,
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

const verify = async (req, res) => {
    let { id } = req.params,
        {
            role,
            ketua_lingkungan,
            id_sekretariat,
        } = req.body,
        data = {}
  
    if(role === 'ketua lingkungan') {
        data.ketua_lingkungan = ketua_lingkungan
        data.ketua_lingkungan_approval = 1
        data.ketua_lingkungan_approval_stamp = getDateTime()
    } else if (role === 'sekretariat'){
        data.id_sekretariat = id_sekretariat
        data.sekretariat_approval = 1
        data.sekretariat_approval_stamp = getDateTime()
    } else if (role === 'pastor pelayan') {
        data.pastor_pelayan_approval = 1
        data.pastor_pelayan_approval_stamp = getDateTime()
    }
        
    try {
        let sql = `SELECT * FROM ${tableName} WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =  `UPDATE ${tableName} SET ? WHERE id=?`
            result = await db(sql, [ data, id ])
  
            res.status(200).send({
                message: "Success verify data",
                result: result,
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed verify data",
            error: error.message,
        })
    }
}

const remove = async (req, res) => {
    let { id } = req.params,
        deleted_at = getTodayDate()

    try {
        let sql = `SELECT * FROM ${tableName} WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =  `UPDATE ${tableName} SET ? WHERE id=?`
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
    getByIdLingkungan,
    post,
    update,
    verify,
    remove
}