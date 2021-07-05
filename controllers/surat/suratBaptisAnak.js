const db = require('../../connection')
    , { getTodayDate, getDateTime, generateNomorSurat, generateFileName, deleteFile } = require('../../utils')
    , path = require('path')

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
                    S.tgl_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM Surat_Baptis_Anak S JOIN Umat A ON (S.id_anak=A.id)
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
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.tgl_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM Surat_Baptis_Anak S JOIN Umat A ON (S.id_anak=A.id)
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
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.tgl_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM Surat_Baptis_Anak S JOIN Umat A ON (S.id_anak=A.id)
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
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.tgl_baptis,
                    S.id_romo_pembaptis,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM Surat_Baptis_Anak S JOIN Umat A ON (S.id_anak=A.id)
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
        console.log(error.message)
        res.status(500).send({
            message: "Failed to retrieve data",
            error: error.message
        })
    }
}

const post = async (req, res) => {
    let no_surat = generateNomorSurat("F4"),
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
        ketua_lingkungan_approval_stamp = null

        if(isKetuaLingkungan === true) {
            ketua_lingkungan_approval = 1
            ketua_lingkungan_approval_stamp = getDateTime()
        } else {
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

        let sql = `INSERT INTO Surat_Baptis_Anak SET ?`
        let result = await db(sql, [
            {
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
    if (ketua_lingkungan_approval === undefined) {
        ketua_lingkungan_approval = 0
    }

    let updated_at = getTodayDate()
    let { id } = req.params
    let tempNamaFile
    
    try {
        let sql = `SELECT * FROM Surat_Baptis_Anak WHERE id = ?`
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

            sql = `UPDATE Surat_Baptis_Anak SET ? WHERE id=?`
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
            ketua_lingkungan_approval,
            id_sekretariat,
            sekretariat_approval,
        } = req.body,
        data = {}

    if(role === 'ketua') {
        data.ketua_lingkungan = ketua_lingkungan
        data.ketua_lingkungan_approval = ketua_lingkungan_approval
        data.ketua_lingkungan_approval_stamp = getDateTime()
    } else {
        data.id_sekretariat = id_sekretariat
        data.sekretariat_approval = sekretariat_approval
        data.sekretariat_approval_stamp = getDateTime()
    }
        
    try {
        let sql = `SELECT * FROM Surat_Baptis_Anak WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =  `UPDATE Surat_Baptis_Anak SET ? WHERE id=?`
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
        let sql = `SELECT * FROM Surat_Baptis_Anak WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =  `UPDATE Surat_Baptis_Anak SET ? WHERE id=?`
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