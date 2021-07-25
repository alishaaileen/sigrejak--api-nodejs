const db = require('../../connection')
    , { v4: uuidv4 } = require('uuid')
    , { getTodayDate, getDateTime, getKodeLingkungan, generateNomorSurat } = require('../../utils')
    , LogSuratcontroller = require('../logSurat')
    , tableName = 'Surat_Keterangan_Pindah'

const getAll = async (req, res) => {
    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.paroki_lama,
                    S.id_lingkungan_lama,
                    L.nama_lingkungan AS nama_lingkungan_lama,
                    S.id_umat,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    S.tgl_domisili_lama,
                    S.alamat_lama,
                    S.no_telp_lama,
                    S.tgl_domisili_baru,
                    S.alamat_baru,
                    S.no_telp_baru,
                    S.id_lingkungan_baru,
                    S.nama_lingkungan_baru,
                    S.paroki_baru,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval_stamp,
                    S.id_romo,
                    S.romo_approval,
                    S.romo_approval_stamp,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat U ON (S.id_umat=U.id) 
                JOIN Lingkungan L ON (S.id_lingkungan_lama=L.id)`
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
                    S.id_umat,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    S.paroki_lama,
                    S.id_lingkungan_lama,
                    L.nama_lingkungan AS nama_lingkungan_lama,
                    S.tgl_domisili_lama,
                    S.alamat_lama,
                    S.no_telp_lama,
                    S.tgl_domisili_baru,
                    S.alamat_baru,
                    S.no_telp_baru,
                    S.id_lingkungan_baru,
                    S.nama_lingkungan_baru,
                    S.paroki_baru,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval_stamp,
                    S.id_romo,
                    S.romo_approval,
                    S.romo_approval_stamp,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat U ON (S.id_umat=U.id) 
                JOIN Lingkungan L ON (S.id_lingkungan_lama=L.id) 
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

const getByIdLingkungan = async (req, res) => {
    const { id } = req.params

    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_umat,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    S.paroki_lama,
                    S.id_lingkungan_lama,
                    L.nama_lingkungan AS nama_lingkungan_lama,
                    S.tgl_domisili_lama,
                    S.alamat_lama,
                    S.no_telp_lama,
                    S.tgl_domisili_baru,
                    S.alamat_baru,
                    S.no_telp_baru,
                    S.id_lingkungan_baru,
                    S.nama_lingkungan_baru,
                    S.paroki_baru,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval_stamp,
                    S.id_romo,
                    S.romo_approval,
                    S.romo_approval_stamp,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat U ON (S.id_umat=U.id) 
                JOIN Lingkungan L ON (S.id_lingkungan_lama=L.id) 
            WHERE S.id_lingkungan_lama = ?`
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
                    S.paroki_lama,
                    S.id_lingkungan_lama,
                    L.nama_lingkungan AS nama_lingkungan_lama,
                    S.id_umat,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    S.tgl_domisili_lama,
                    S.alamat_lama,
                    S.no_telp_lama,
                    S.tgl_domisili_baru,
                    S.alamat_baru,
                    S.no_telp_baru,
                    S.id_lingkungan_baru,
                    S.nama_lingkungan_baru,
                    S.paroki_baru,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval_stamp,
                    S.id_romo,
                    S.romo_approval,
                    S.romo_approval_stamp,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat U ON (S.id_umat=U.id) 
                JOIN Lingkungan L ON (S.id_lingkungan_lama=L.id) 
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
    let id =uuidv4(),
        {
            id_keluarga,
            paroki_lama,
            id_lingkungan_lama,
            ketua_lingkungan,
            id_umat,
            tgl_domisili_lama,
            alamat_lama,
            no_telp_lama,
            tgl_domisili_baru,
            alamat_baru,
            no_telp_baru,
            id_lingkungan_baru,
            nama_lingkungan_baru,
            paroki_baru,
            isKetuaLingkungan
        } = req.body,
        created_at = getTodayDate(),
        ketua_lingkungan_approval = 0,
        ketua_lingkungan_approval_stamp = null,
        kode_lingkungan = await getKodeLingkungan(id_lingkungan_lama)

    let no_surat = await generateNomorSurat('F11', kode_lingkungan, tableName)
    
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
                paroki_lama,
                id_lingkungan_lama,
                id_umat,
                tgl_domisili_lama,
                alamat_lama,
                no_telp_lama,
                tgl_domisili_baru,
                alamat_baru,
                no_telp_baru,
                id_lingkungan_baru,
                nama_lingkungan_baru,
                paroki_baru,
                ketua_lingkungan,
                ketua_lingkungan_approval,
                ketua_lingkungan_approval_stamp,
                created_at,
            }
        ])

        // Catat ke log surat
        LogSuratcontroller.post(id, 0, 0)

        if(isKetuaLingkungan === true) {
            LogSuratcontroller.post(id, 2, 1)
        }
        
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
        paroki_lama,
        id_lingkungan_lama,
        id_umat,
        tgl_domisili_lama,
        alamat_lama,
        no_telp_lama,
        tgl_domisili_baru,
        alamat_baru,
        no_telp_baru,
        paroki_baru,
        id_lingkungan_baru,
        nama_lingkungan_baru,
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
                                        paroki_lama,
                                        id_lingkungan_lama,
                                        id_umat,
                                        tgl_domisili_lama,
                                        alamat_lama,
                                        no_telp_lama,
                                        tgl_domisili_baru,
                                        alamat_baru,
                                        no_telp_baru,
                                        paroki_baru,
                                        id_lingkungan_baru,
                                        nama_lingkungan_baru,
                                        updated_at,
                                    }, id ])

            // Catat ke log surat
            LogSuratcontroller.post(id, 1, 0)
    
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
            id_romo,
        } = req.body,
        data = {},
        roleId
  
    if(role === 'ketua lingkungan') {
        data.ketua_lingkungan = ketua_lingkungan
        data.ketua_lingkungan_approval = 1
        data.ketua_lingkungan_approval_stamp = getDateTime()
        roleId = 1
    } else if (role === 'sekretariat'){
        data.id_sekretariat = id_sekretariat
        data.sekretariat_approval = 1
        data.sekretariat_approval_stamp = getDateTime()
        roleId = 2
    } else if (role === 'romo paroki') {
        data.id_romo = id_romo
        data.romo_approval = 1
        data.romo_approval_stamp = getDateTime()
        roleId = 3
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

            // Catat ke log surat
            LogSuratcontroller.post(id, 2, roleId)
  
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

            // Catat ke log surat
            LogSuratcontroller.post(id, 3, 0)

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
    getByIdLingkungan,
    getByIdKeluarga,
    post,
    update,
    verify,
    remove
}