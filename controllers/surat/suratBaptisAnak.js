const db = require('../../connection')
    , { v4: uuidv4 } = require('uuid')
    , { getTodayDate, getDateTime, getKodeLingkungan,
        generateNomorSurat, generateFileName, deleteFile } = require('../../utils')
    , path = require('path')
    , tableName = 'Surat_Baptis_Anak'

const getAll = async (req, res) => {
    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.id_anak,
                    A.nama,
                    S.nama_baptis,
                    A.tempat_lahir,
                    A.tgl_lahir,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    Ayah.alamat AS alamat_ortu,
                    Ayah.no_telp AS no_telp_ortu,
                    S.cara_ortu_menikah,
                    S.tempat_ortu_menikah,
                    S.tgl_ortu_menikah,
                    S.nama_wali_baptis,
                    S.tgl_krisma_wali_baptis,
                    D.file_akta_lahir,
                    S.file_syarat_baptis,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat A ON (S.id_anak=A.id)
                JOIN Detail_Umat D ON (A.id=D.id_umat)
                JOIN (SELECT id, nama, no_telp, alamat FROM Umat) Ayah ON (D.id_ayah=Ayah.id)
                JOIN (SELECT id, nama FROM Umat) Ibu ON (D.id_ibu=Ibu.id) 
                JOIN Lingkungan L ON (S.id_lingkungan=L.id)`
                
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

const getAllSchedule = async (req, res) => {
    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.id_anak,
                    A.nama,
                    S.nama_baptis,
                    A.tempat_lahir,
                    A.tgl_lahir,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    Ayah.alamat AS alamat_ortu,
                    Ayah.no_telp AS no_telp_ortu,
                    S.cara_ortu_menikah,
                    S.tempat_ortu_menikah,
                    S.tgl_ortu_menikah,
                    S.nama_wali_baptis,
                    S.tgl_krisma_wali_baptis,
                    D.file_akta_lahir,
                    S.file_syarat_baptis,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat A ON (S.id_anak=A.id)
                JOIN Detail_Umat D ON (A.id=D.id_umat)
                JOIN (SELECT id, nama, no_telp, alamat FROM Umat) Ayah ON (D.id_ayah=Ayah.id)
                JOIN (SELECT id, nama FROM Umat) Ibu ON (D.id_ibu=Ibu.id) 
                JOIN Lingkungan L ON (S.id_lingkungan=L.id)
            WHERE S.jadwal_baptis IS NOT NULL`
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
                    S.id_anak,
                    A.nama,
                    S.nama_baptis,
                    A.tempat_lahir,
                    A.tgl_lahir,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    Ayah.alamat AS alamat_ortu,
                    Ayah.no_telp AS no_telp_ortu,
                    S.cara_ortu_menikah,
                    S.tempat_ortu_menikah,
                    S.tgl_ortu_menikah,
                    S.nama_wali_baptis,
                    S.tgl_krisma_wali_baptis,
                    D.file_akta_lahir,
                    S.file_syarat_baptis,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat A ON (S.id_anak=A.id)
                JOIN Detail_Umat D ON (A.id=D.id_umat)
                JOIN (SELECT id, nama, no_telp, alamat FROM Umat) Ayah ON (D.id_ayah=Ayah.id)
                JOIN (SELECT id, nama FROM Umat) Ibu ON (D.id_ibu=Ibu.id) 
                JOIN Lingkungan L ON (S.id_lingkungan=L.id)
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
                    S.id_anak,
                    A.nama,
                    S.nama_baptis,
                    A.tempat_lahir,
                    A.tgl_lahir,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    Ayah.alamat AS alamat_ortu,
                    Ayah.no_telp AS no_telp_ortu,
                    S.cara_ortu_menikah,
                    S.tempat_ortu_menikah,
                    S.tgl_ortu_menikah,
                    S.nama_wali_baptis,
                    S.tgl_krisma_wali_baptis,
                    D.file_akta_lahir,
                    S.file_syarat_baptis,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat A ON (S.id_anak=A.id)
                JOIN Detail_Umat D ON (A.id=D.id_umat)
                JOIN (SELECT id, nama, no_telp, alamat FROM Umat) Ayah ON (D.id_ayah=Ayah.id)
                JOIN (SELECT id, nama FROM Umat) Ibu ON (D.id_ibu=Ibu.id) 
                JOIN Lingkungan L ON (S.id_lingkungan=L.id)
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
                    S.id_anak,
                    A.nama,
                    S.nama_baptis,
                    A.tempat_lahir,
                    A.tgl_lahir,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    Ayah.alamat AS alamat_ortu,
                    Ayah.no_telp AS no_telp_ortu,
                    S.cara_ortu_menikah,
                    S.tempat_ortu_menikah,
                    S.tgl_ortu_menikah,
                    S.nama_wali_baptis,
                    S.tgl_krisma_wali_baptis,
                    D.file_akta_lahir,
                    S.file_syarat_baptis,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.sekretariat_approval,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat A ON (S.id_anak=A.id)
                JOIN Detail_Umat D ON (A.id=D.id_umat)
                JOIN (SELECT id, nama, no_telp, alamat FROM Umat) Ayah ON (D.id_ayah=Ayah.id)
                JOIN (SELECT id, nama FROM Umat) Ibu ON (D.id_ibu=Ibu.id) 
                JOIN Lingkungan L ON (S.id_lingkungan=L.id)
            WHERE S.id_keluarga = ?`
        let result = await db(sql, [ id ])

        res.status(200).send({
            message: "Success retrieving data",
            result: result,
        })
    } catch (error) {
        console.log(error)
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
            id_anak,
            nama_baptis,
            cara_ortu_menikah,
            tempat_ortu_menikah,
            tgl_ortu_menikah,
            nama_wali_baptis,
            tgl_krisma_wali_baptis,
            ketua_lingkungan,
            isKetuaLingkungan,
        } = req.body,
        { file_syarat_baptis } = req.files,
        created_at = getTodayDate(),
        ketua_lingkungan_approval = 0,
        ketua_lingkungan_approval_stamp = null,
      kode_lingkungan = await getKodeLingkungan(id_lingkungan)

    let no_surat = await generateNomorSurat('F4', kode_lingkungan, tableName)
    
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
        let tempNamaFile = generateFileName('baptis-anak', path.extname(file_syarat_baptis.name))

        file_syarat_baptis.mv(`${pathToFiles}${tempNamaFile}`, (err) => {
            if(err) {
                console.log("syarat baptis anak error: "+err)
                return res.status(500).send({
                    message: "Failed to save file",
                })
            }
        })

        let sql = `INSERT INTO ${tableName} SET ?`
        let result = await db(sql, [ {
                id,
                no_surat,
                id_keluarga,
                id_lingkungan,
                id_anak,
                nama_baptis,
                cara_ortu_menikah,
                tempat_ortu_menikah,
                tgl_ortu_menikah,
                nama_wali_baptis,
                tgl_krisma_wali_baptis,
                file_syarat_baptis: tempNamaFile,
                ketua_lingkungan,
                ketua_lingkungan_approval,
                ketua_lingkungan_approval_stamp,
                created_at,
            } ])
        
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
        id_anak,
        nama_baptis,
        cara_ortu_menikah,
        tempat_ortu_menikah,
        tgl_ortu_menikah,
        nama_wali_baptis,
        tgl_krisma_wali_baptis,
    } = req.body,
    file_syarat_baptis = null
    file_syarat_baptis = req.files != null ? req.files.file_syarat_baptis : null

    console.log(typeof req.files)

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
            if(file_syarat_baptis != null) {
                let pathToFiles = `files/`
                
                if(result[0].file_syarat_baptis) {
                    let del = await deleteFile(pathToFiles, result[0].file_syarat_baptis)
                    console.log('del: '+del)
                    if ( del === false ) {
                        return res.status(500).send({ message: "Failed to delete old file" })
                    }
                }
    
                tempNamaFile = generateFileName('baptis-anak', path.extname(file_syarat_baptis.name))
    
                file_syarat_baptis.mv(`${pathToFiles}${tempNamaFile}`, (err) => {
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
                id_anak,
                nama_baptis,
                cara_ortu_menikah,
                tempat_ortu_menikah,
                tgl_ortu_menikah,
                nama_wali_baptis,
                tgl_krisma_wali_baptis,
                updated_at,
            }
            if(file_syarat_baptis != null) {
                data.file_syarat_baptis = tempNamaFile
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
            jadwal_baptis,
            id_romo_pembaptis,
            nama_baptis,
        } = req.body,
        data = {}

    if(role === 'ketua lingkungan') {
        data.ketua_lingkungan = ketua_lingkungan
        data.ketua_lingkungan_approval = 1
        data.ketua_lingkungan_approval_stamp = getDateTime()
    } else {
        data.id_sekretariat = id_sekretariat
        data.sekretariat_approval = 1
        data.sekretariat_approval_stamp = getDateTime()
        data.jadwal_baptis = jadwal_baptis
        data.id_romo_pembaptis = id_romo_pembaptis
    }
        
    try {
        let sql = `SELECT * FROM ${tableName} WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            // verify
            sql =  `UPDATE ${tableName} SET ? WHERE id=?`
            result = await db(sql, [ data, id ])

            res.status(200).send({
                message: "Success verify data",
                result: result,
            })

            if(role === 'sekretariat') {
                // Update tgl baptis
                sql =  `UPDATE Detail_Umat SET ?
                        WHERE id_umat=(SELECT id_anak FROM ${tableName} WHERE id=?)`
                result = await db(sql, [ {
                    tgl_baptis: jadwal_baptis.substring(0,10)
                }, id ])

                // Update nama baptis
                sql =  `UPDATE Umat SET ?
                        WHERE id=(SELECT id_anak FROM ${tableName} WHERE id=?)`
                result = await db(sql, [ {
                    nama_baptis: nama_baptis,
                }, id ])
            }
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
    getAllSchedule,
    getById,
    getByIdLingkungan,
    getByIdKeluarga,
    post,
    update,
    verify,
    remove
}