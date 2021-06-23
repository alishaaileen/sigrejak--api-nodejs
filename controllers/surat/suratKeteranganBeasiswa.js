const db = require('../../connection')
    , { getTodayDate, generateNomorSurat, generateFileName, deleteFile } = require('../../utils')
    , path = require('path')

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
                    S.id_ortu,
                    O.nama AS nama_ortu,
                    O.alamat AS alamat_ortu,
                    O.no_telp AS no_telp_ortu,
                    S.status_beasiswa,
                    S.permohonan,
                    S.file_syarat_beasiswa,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.id_romo,
                    S.romo_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
                FROM Surat_Keterangan_Beasiswa S JOIN Umat U on (S.id_siswa=U.id)
                JOIN (SELECT * FROM Umat) O on (S.id_ortu=O.id)`
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
                    S.id_ortu,
                    O.nama AS nama_ortu,
                    O.alamat AS alamat_ortu,
                    O.no_telp AS no_telp_ortu,
                    S.status_beasiswa,
                    S.permohonan,
                    S.file_syarat_beasiswa,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.id_romo,
                    S.romo_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM Surat_Keterangan_Beasiswa S JOIN Umat U on (S.id_siswa=U.id)
            JOIN (SELECT * FROM Umat) O on (S.id_ortu=O.id) 
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
                    S.id_siswa,
                    U.nama,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    U.no_telp,
                    S.sekolah,
                    S.kelas,
                    S.id_ortu,
                    O.nama AS nama_ortu,
                    O.alamat AS alamat_ortu,
                    O.no_telp AS no_telp_ortu,
                    S.status_beasiswa,
                    S.permohonan,
                    S.file_syarat_beasiswa,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.id_romo,
                    S.romo_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM Surat_Keterangan_Beasiswa S JOIN Umat U on (S.id_siswa=U.id)
            JOIN (SELECT * FROM Umat) O on (S.id_ortu=O.id) 
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
    let no_surat = generateNomorSurat('F2'),
        {
            id_keluarga,
            id_lingkungan,
            ketua_lingkungan,
            id_siswa,
            sekolah,
            kelas,
            id_ortu,
            status_beasiswa,
            permohonan,
            isKetuaLingkungan,
        } = req.body,
        { file_syarat_beasiswa } = req.files,

        created_at = getTodayDate(),
        id_sekretariat = null,
        sekretariat_approval = null,
        id_romo = null,
        romo_approval = null,
        ketua_lingkungan_approval = isKetuaLingkungan
        if(isKetuaLingkungan == 0) ketua_lingkungan = null

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

        let sql = `INSERT INTO Surat_Keterangan_Beasiswa SET ?`
        let result = await db(sql, [ 
            {
                no_surat,
                id_keluarga,
                id_lingkungan,
                ketua_lingkungan,
                id_siswa,
                sekolah,
                kelas,
                id_ortu,
                status_beasiswa,
                permohonan,
                file_syarat_beasiswa: tempNamaFile,
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
        id_keluarga,
        id_lingkungan,
        ketua_lingkungan,
        id_siswa,
        sekolah,
        kelas,
        id_ortu,
        status_beasiswa,
        permohonan,
        ketua_lingkungan_approval,
        id_sekretariat,
        sekretariat_approval,
        id_romo,
        romo_approval,
    } = req.body,
    file_syarat_beasiswa = null
    file_syarat_beasiswa = req.files != null ? req.files.file_syarat_beasiswa : null

    let updated_at = getTodayDate()
    let { id } = req.params
    
    try {
        let sql = `SELECT * FROM Surat_Keterangan_Beasiswa WHERE id = ?`
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

            sql = `UPDATE Surat_Keterangan_Beasiswa SET ? WHERE id=?`
            let data = {
                id_keluarga,
                id_lingkungan,
                ketua_lingkungan,
                id_siswa,
                sekolah,
                kelas,
                id_ortu,
                status_beasiswa,
                permohonan,
                ketua_lingkungan_approval,
                id_sekretariat,
                sekretariat_approval,
                id_romo,
                romo_approval,
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

const remove = async (req, res) => {
    let { id } = req.params,
        deleted_at = getTodayDate()

    try {
        let sql = `SELECT * FROM Surat_Keterangan_Beasiswa WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =  `UPDATE Surat_Keterangan_Beasiswa SET ? WHERE id=?`
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