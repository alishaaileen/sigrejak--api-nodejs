const db = require('../../connection')
    , { getTodayDate, getDateTime, generateNomorSurat, generateFileName, deleteFile } = require('../../utils')
    , path = require('path')
    , tableName = 'Surat_Keterangan_Beasiswa'

const getAll = async (req, res) => {
    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.ketua_lingkungan,
                    S.id_siswa,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.no_telp,
                    S.sekolah,
                    S.kelas,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    Ayah.alamat AS alamat_ortu,
                    Ayah.pekerjaan AS pekerjaan_ayah,
                    Ibu.pekerjaan AS pekerjaan_ibu,
                    S.status_beasiswa,
                    S.permohonan,
                    S.file_syarat_beasiswa,
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
                FROM ${tableName} S JOIN Umat U on (S.id_siswa=U.id)
                    JOIN Detail_Umat D ON (S.id_siswa=D.id_umat)
                    JOIN (SELECT * FROM Umat) Ayah on (D.id_ayah=Ayah.id) 
                    JOIN (SELECT * FROM Umat) Ibu on (D.id_ibu=Ibu.id) `
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
                    S.id_siswa,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.no_telp,
                    S.sekolah,
                    S.kelas,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    Ayah.alamat AS alamat_ortu,
                    Ayah.pekerjaan AS pekerjaan_ayah,
                    Ibu.pekerjaan AS pekerjaan_ibu,
                    S.status_beasiswa,
                    S.permohonan,
                    S.file_syarat_beasiswa,
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
            FROM ${tableName} S JOIN Umat U on (S.id_siswa=U.id)
                JOIN Detail_Umat D ON (S.id_siswa=D.id_umat)
                JOIN (SELECT * FROM Umat) Ayah on (D.id_ayah=Ayah.id) 
                JOIN (SELECT * FROM Umat) Ibu on (D.id_ibu=Ibu.id) 
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
                    S.id_lingkungan,
                    S.ketua_lingkungan,
                    S.id_siswa,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.no_telp,
                    S.sekolah,
                    S.kelas,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    Ayah.alamat AS alamat_ortu,
                    Ayah.pekerjaan AS pekerjaan_ayah,
                    Ibu.pekerjaan AS pekerjaan_ibu,
                    S.status_beasiswa,
                    S.permohonan,
                    S.file_syarat_beasiswa,
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
            FROM ${tableName} S JOIN Umat U on (S.id_siswa=U.id)
                JOIN Detail_Umat D ON (S.id_siswa=D.id_umat)
                JOIN (SELECT * FROM Umat) Ayah on (D.id_ayah=Ayah.id) 
                JOIN (SELECT * FROM Umat) Ibu on (D.id_ibu=Ibu.id) 
            WHERE S.id_lingkungan = ?`
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
                    S.id_siswa,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.no_telp,
                    S.sekolah,
                    S.kelas,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    Ayah.alamat AS alamat_ortu,
                    Ayah.pekerjaan AS pekerjaan_ayah,
                    Ibu.pekerjaan AS pekerjaan_ibu,
                    S.status_beasiswa,
                    S.permohonan,
                    S.file_syarat_beasiswa,
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
            FROM ${tableName} S JOIN Umat U on (S.id_siswa=U.id)
                JOIN Detail_Umat D ON (S.id_siswa=D.id_umat)
                JOIN (SELECT * FROM Umat) Ayah on (D.id_ayah=Ayah.id) 
                JOIN (SELECT * FROM Umat) Ibu on (D.id_ibu=Ibu.id) 
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
    let {
            id_keluarga,
            id_lingkungan,
            ketua_lingkungan,
            id_siswa,
            sekolah,
            kelas,
            status_beasiswa,
            permohonan,
            isKetuaLingkungan,
        } = req.body,
        { file_syarat_beasiswa } = req.files,
        created_at = getTodayDate(),
        ketua_lingkungan_approval = 0,
        ketua_lingkungan_approval_stamp = null
    
    let no_surat = await generateNomorSurat('F2', id_lingkungan, '${tableName}')
    
    // Maksud dari (isKetuaLingkungan === 'true') gunanya
    // untuk mengubah isKetuaLingkungan jadi Boolean.
    // Karena dari front end itu pake FormData(),
    // semua data jadi String.
    if((isKetuaLingkungan === 'true') === true) {
        ketua_lingkungan_approval = 1
        ketua_lingkungan_approval_stamp = getDateTime()
    } else  {
        ketua_lingkungan = null
    }

    try {
        let pathToFiles = `files/`
        let tempNamaFile = generateFileName('beasiswa', path.extname(file_syarat_beasiswa.name))

        file_syarat_beasiswa.mv(`${pathToFiles}${tempNamaFile}`, (err) => {
            if(err) {
                console.log("syarat beasiswa error: "+err)
                return res.status(500).send({
                    message: "Failed to save file",
                })
            }
        })

        let sql = `INSERT INTO ${tableName} SET ?`
        let result = await db(sql, [ 
            {
                no_surat,
                id_keluarga,
                id_lingkungan,
                ketua_lingkungan,
                id_siswa,
                sekolah,
                kelas,
                status_beasiswa,
                permohonan,
                file_syarat_beasiswa: tempNamaFile,
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
        id_keluarga,
        id_lingkungan,
        id_siswa,
        sekolah,
        kelas,
        status_beasiswa,
        permohonan,
    } = req.body,
    file_syarat_beasiswa = null
    file_syarat_beasiswa = req.files != null ? req.files.file_syarat_beasiswa : null

    // Saat ketua lingkungan blm approve dan user edit data,
    // ketua_lingkungan_approval harus di-set jadi 0
    // karena by default dari front end itu undefined
    // Karna di front end pakenya FormData()
    // if (ketua_lingkungan_approval === undefined) {
    //     ketua_lingkungan_approval = 0
    // }

    let updated_at = getTodayDate()
    let { id } = req.params
    let tempNamaFile
    
    try {
        let sql = `SELECT * FROM ${tableName} WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            if(file_syarat_beasiswa != null) {
                let pathToFiles = `files/`
                
                if(result[0].file_syarat_beasiswa) {
                    let del = await deleteFile(pathToFiles, result[0].file_syarat_beasiswa)
                    console.log('del: '+del)
                    if ( del === false ) {
                        return res.status(500).send({ message: "Failed to delete old file" })
                    }
                }
    
                tempNamaFile = generateFileName('beasiswa', path.extname(file_syarat_beasiswa.name))
    
                file_syarat_beasiswa.mv(`${pathToFiles}${tempNamaFile}`, (err) => {
                    if(err) {
                        console.log('error save file')
                        console.log(err)
                        return res.status(500).send({ message: "Failed to save file" })
                    }
                    console.log('berhasil simpan')
                })
            }

            sql = `UPDATE ${tableName} SET ? WHERE id=?`
            let data = {
                id_keluarga,
                id_lingkungan,
                id_siswa,
                sekolah,
                kelas,
                status_beasiswa,
                permohonan,
                updated_at,
            }
            if(file_syarat_beasiswa != null) {
                data.file_syarat_beasiswa = tempNamaFile
            }

            result = await db(sql, [ data, id ]) 
    
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
        data = {}
  
    if(role === 'ketua lingkungan') {
        data.ketua_lingkungan = ketua_lingkungan
        data.ketua_lingkungan_approval = 1
        data.ketua_lingkungan_approval_stamp = getDateTime()
    } else if (role === 'sekretariat'){
        data.id_sekretariat = id_sekretariat
        data.sekretariat_approval = 1
        data.sekretariat_approval_stamp = getDateTime()
    } else if (role === 'romo paroki') {
        data.id_romo = id_romo
        data.romo_approval = 1
        data.romo_approval_stamp = getDateTime()
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
    getByIdLingkungan,
    getByIdKeluarga,
    post,
    update,
    verify,
    remove
}