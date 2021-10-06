const db = require('../../connection')
    , { v4: uuidv4 } = require('uuid')
    , { getTodayDate, getDateTime, getKodeLingkungan,
        generateNomorSurat, generateFileName, deleteFile } = require('../../utils')
    , LogSuratcontroller = require('../logSurat')
    , path = require('path')
    , tableName = 'Surat_Baptis_Dewasa'

const getAll = async (req, res) => {
    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.id_umat,
                    U.nama,
                    S.nama_baptis,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.no_telp,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    S.status_perkawinan,
                    S.calon_pasangan,
                    S.tgl_menikah_calon,
                    S.cara_menikah,
                    S.tempat_menikah,
                    S.tgl_menikah,
                    S.pembatalan_perkawinan,
                    S.tgl_mulai_belajar_agama,
                    S.tgl_mulai_ikut_ekaristi,
                    S.tgl_mulai_kegiatan_lingkungan,
                    S.nama_guru,
                    S.nama_wali,
                    S.tgl_krisma_wali,
                    S.tempat_krisma_wali,
                    D.file_akta_lahir,
                    S.file_syarat_baptis,
                    S.tempat_tahap_satu,
                    S.tgl_tahap_satu,
                    S.id_romo_tahap_satu,
                    S.tempat_tahap_dua,
                    S.tgl_tahap_dua,
                    S.id_romo_tahap_dua,
                    S.tempat_baptis,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval_stamp,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat U ON (S.id_umat=U.id)
                JOIN Detail_Umat D ON (U.id=D.id_umat)
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
                    S.id_umat,
                    U.nama,
                    S.nama_baptis,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.no_telp,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    S.status_perkawinan,
                    S.calon_pasangan,
                    S.tgl_menikah_calon,
                    S.cara_menikah,
                    S.tempat_menikah,
                    S.tgl_menikah,
                    S.pembatalan_perkawinan,
                    S.tgl_mulai_belajar_agama,
                    S.tgl_mulai_ikut_ekaristi,
                    S.tgl_mulai_kegiatan_lingkungan,
                    S.nama_guru,
                    S.nama_wali,
                    S.tgl_krisma_wali,
                    S.tempat_krisma_wali,
                    D.file_akta_lahir,
                    S.file_syarat_baptis,
                    S.tempat_tahap_satu,
                    S.tgl_tahap_satu,
                    S.id_romo_tahap_satu,
                    S.tempat_tahap_dua,
                    S.tgl_tahap_dua,
                    S.id_romo_tahap_dua,
                    S.tempat_baptis,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval_stamp,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat U ON (S.id_umat=U.id)
                JOIN Detail_Umat D ON (U.id=D.id_umat)
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
                    S.id_umat,
                    U.nama,
                    S.nama_baptis,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.no_telp,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    S.status_perkawinan,
                    S.calon_pasangan,
                    S.tgl_menikah_calon,
                    S.cara_menikah,
                    S.tempat_menikah,
                    S.tgl_menikah,
                    S.pembatalan_perkawinan,
                    D.file_akta_lahir,
                    S.tgl_mulai_belajar_agama,
                    S.tgl_mulai_ikut_ekaristi,
                    S.tgl_mulai_kegiatan_lingkungan,
                    S.nama_guru,
                    S.nama_wali,
                    S.tgl_krisma_wali,
                    S.tempat_krisma_wali,
                    S.file_syarat_baptis,
                    S.tempat_tahap_satu,
                    S.tgl_tahap_satu,
                    S.id_romo_tahap_satu,
                    S.tempat_tahap_dua,
                    S.tgl_tahap_dua,
                    S.id_romo_tahap_dua,
                    S.tempat_baptis,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval_stamp,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat U ON (S.id_umat=U.id)
                JOIN Detail_Umat D ON (U.id=D.id_umat)
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
                    S.id_umat,
                    U.nama,
                    S.nama_baptis,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.no_telp,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    S.status_perkawinan,
                    S.calon_pasangan,
                    S.tgl_menikah_calon,
                    S.cara_menikah,
                    S.tempat_menikah,
                    S.tgl_menikah,
                    S.pembatalan_perkawinan,
                    D.file_akta_lahir,
                    S.tgl_mulai_belajar_agama,
                    S.tgl_mulai_ikut_ekaristi,
                    S.tgl_mulai_kegiatan_lingkungan,
                    S.nama_guru,
                    S.nama_wali,
                    S.tgl_krisma_wali,
                    S.tempat_krisma_wali,
                    S.file_syarat_baptis,
                    S.tempat_tahap_satu,
                    S.tgl_tahap_satu,
                    S.id_romo_tahap_satu,
                    S.tempat_tahap_dua,
                    S.tgl_tahap_dua,
                    S.id_romo_tahap_dua,
                    S.tempat_baptis,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval_stamp,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat U ON (S.id_umat=U.id)
                JOIN Detail_Umat D ON (U.id=D.id_umat)
                JOIN (SELECT id, nama, no_telp, alamat FROM Umat) Ayah ON (D.id_ayah=Ayah.id)
                JOIN (SELECT id, nama FROM Umat) Ibu ON (D.id_ibu=Ibu.id) 
                JOIN Lingkungan L ON (S.id_lingkungan=L.id)
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

const getByIdKeluarga = async (req, res) => {
    const { id } = req.params

    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.id_umat,
                    U.nama,
                    S.nama_baptis,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.no_telp,
                    Ayah.nama AS nama_ayah,
                    Ibu.nama AS nama_ibu,
                    S.status_perkawinan,
                    S.calon_pasangan,
                    S.tgl_menikah_calon,
                    S.cara_menikah,
                    S.tempat_menikah,
                    S.tgl_menikah,
                    S.pembatalan_perkawinan,
                    D.file_akta_lahir,
                    S.status_perkawinan,
                    S.calon_pasangan,
                    S.tgl_menikah_calon,
                    S.cara_menikah,
                    S.tempat_menikah,
                    S.tgl_menikah,
                    S.pembatalan_perkawinan,
                    S.tgl_mulai_belajar_agama,
                    S.tgl_mulai_ikut_ekaristi,
                    S.tgl_mulai_kegiatan_lingkungan,
                    S.nama_guru,
                    S.nama_wali,
                    S.tgl_krisma_wali,
                    S.tempat_krisma_wali,
                    S.file_syarat_baptis,
                    S.tempat_tahap_satu,
                    S.tgl_tahap_satu,
                    S.id_romo_tahap_satu,
                    S.tempat_tahap_dua,
                    S.tgl_tahap_dua,
                    S.id_romo_tahap_dua,
                    S.tempat_baptis,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval_stamp,
                    S.id_sekretariat,
                    S.sekretariat_approval_stamp,
                    S.jadwal_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM ${tableName} S JOIN Umat U ON (S.id_umat=U.id)
                JOIN Detail_Umat D ON (U.id=D.id_umat)
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
            id_umat,
            nama_baptis,
            status_perkawinan,
            calon_pasangan,
            tgl_menikah_calon,
            cara_menikah,
            tempat_menikah,
            tgl_menikah,
            pembatalan_perkawinan,
            tgl_mulai_belajar_agama,
            tgl_mulai_ikut_ekaristi,
            tgl_mulai_kegiatan_lingkungan,
            nama_guru,
            nama_wali,
            tgl_krisma_wali,
            tempat_krisma_wali,
            ketua_lingkungan,
            isKetuaLingkungan,
        } = req.body,
        { file_syarat_baptis } = req.files,
        created_at = getTodayDate(),
        ketua_lingkungan_approval_stamp = null,
        kode_lingkungan = await getKodeLingkungan(id_lingkungan)

    let no_surat = await generateNomorSurat('F5', kode_lingkungan, tableName)
    
    // Maksud dari (isKetuaLingkungan === 'true') gunanya
    // untuk mengubah isKetuaLingkungan jadi Boolean.
    // Karena dari front end itu pake FormData(),
    // semua data jadi String.
    if((isKetuaLingkungan === 'true') === true) {
        ketua_lingkungan_approval_stamp = getDateTime()
    } else  {
        ketua_lingkungan = null
    }

    try {
        let pathToFiles = `files/`
        let tempNamaFile = generateFileName('baptis-dewasa', path.extname(file_syarat_baptis.name))

        file_syarat_baptis.mv(`${pathToFiles}${tempNamaFile}`, (err) => {
            if(err) {
                console.log("syarat baptis dewasa error: "+err)
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
                id_umat,
                nama_baptis,
                status_perkawinan,
                calon_pasangan,
                tgl_menikah_calon,
                cara_menikah,
                tempat_menikah,
                tgl_menikah,
                pembatalan_perkawinan,
                tgl_mulai_belajar_agama,
                tgl_mulai_ikut_ekaristi,
                tgl_mulai_kegiatan_lingkungan,
                nama_guru,
                nama_wali,
                tgl_krisma_wali,
                tempat_krisma_wali,
                file_syarat_baptis: tempNamaFile,
                ketua_lingkungan,
                ketua_lingkungan_approval_stamp,
                created_at,
            } ])
        
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
        id_keluarga,
        id_lingkungan,
        id_umat,
        nama_baptis,
        status_perkawinan,
        calon_pasangan,
        tgl_menikah_calon,
        cara_menikah,
        tempat_menikah,
        tgl_menikah,
        pembatalan_perkawinan,
        tgl_mulai_belajar_agama,
        tgl_mulai_ikut_ekaristi,
        tgl_mulai_kegiatan_lingkungan,
        nama_guru,
        nama_wali,
        tgl_krisma_wali,
        tempat_krisma_wali,
    } = req.body,
    file_syarat_baptis = null
    file_syarat_baptis = req.files != null ? req.files.file_syarat_baptis : null

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
    
                tempNamaFile = generateFileName('baptis-dewasa', path.extname(file_syarat_baptis.name))
    
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
                id_umat,
                nama_baptis,
                status_perkawinan,
                calon_pasangan,
                tgl_menikah_calon,
                cara_menikah,
                tempat_menikah,
                tgl_menikah,
                pembatalan_perkawinan,
                tgl_mulai_belajar_agama,
                tgl_mulai_ikut_ekaristi,
                tgl_mulai_kegiatan_lingkungan,
                nama_guru,
                nama_wali,
                tgl_krisma_wali,
                tempat_krisma_wali,
                updated_at,
            }
            if(file_syarat_baptis != null) {
                data.file_syarat_baptis = tempNamaFile
            }

            result = await db(sql, [ data, id ])

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
            tempat_tahap_satu,
            tgl_tahap_satu,
            id_romo_tahap_satu,
            tempat_tahap_dua,
            tgl_tahap_dua,
            id_romo_tahap_dua,
            jadwal_baptis,
            tempat_baptis,
            id_romo_pembaptis,
            nama_baptis,
        } = req.body,
        data = {}

    if(role === 'ketua lingkungan') {
        data.ketua_lingkungan = ketua_lingkungan
        data.ketua_lingkungan_approval = 1
        data.ketua_lingkungan_approval_stamp = getDateTime()
        roleId = 1
    } else {
        data.id_sekretariat = id_sekretariat
        data.sekretariat_approval = 1
        data.sekretariat_approval_stamp = getDateTime()
        data.tempat_tahap_satu = tempat_tahap_satu
        data.tgl_tahap_satu = tgl_tahap_satu
        data.id_romo_tahap_satu = id_romo_tahap_satu
        data.tempat_tahap_dua = tempat_tahap_dua
        data.tgl_tahap_dua = tgl_tahap_dua
        data.id_romo_tahap_dua = id_romo_tahap_dua
        data.jadwal_baptis = jadwal_baptis
        data.tempat_baptis = tempat_baptis
        data.id_romo_pembaptis = id_romo_pembaptis
        roleId = 2
    }

    console.log(data.id_romo_tahap_satu)
        
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

            // Catat ke log surat
            LogSuratcontroller.post(id, 2, roleId)

            res.status(200).send({
                message: "Success verify data",
                result: result,
            })

            if(role === 'sekretariat') {
                // Update tgl baptis
                sql =  `UPDATE Detail_Umat SET ?
                        WHERE id_umat=(SELECT id_umat FROM ${tableName} WHERE id=?)`
                result = await db(sql, [ {
                    tgl_baptis: jadwal_baptis.substring(0,10)
                }, id ])

                // Update nama baptis
                sql =  `UPDATE Umat SET ?
                        WHERE id=(SELECT id_umat FROM ${tableName} WHERE id=?)`
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
    getAllSchedule,
    getById,
    getByIdLingkungan,
    getByIdKeluarga,
    post,
    update,
    verify,
    remove
}