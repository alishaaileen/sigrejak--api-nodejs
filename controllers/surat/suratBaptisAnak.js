const db = require('../../connection')
const { getTodayDate, generateNomorSurat } = require('../../utils')

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
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.tgl_baptis,
                    S.romo_pembaptis,
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
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.tgl_baptis,
                    S.romo_pembaptis,
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
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    S.tgl_baptis,
                    S.romo_pembaptis,
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
        created_at = getTodayDate(),
        id_sekretariat = null,
        sekretariat_approval = null,
        ketua_lingkungan_approval = isKetuaLingkungan ? 1 : 0
        if(!isKetuaLingkungan) ketua_lingkungan = null

    try {
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
                ketua_lingkungan,
                ketua_lingkungan_approval,
                id_sekretariat,
                sekretariat_approval,
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
        id_anak,
        nama_baptis,
        cara_ortu_menikah,
        tempat_ortu_menikah,
        tgl_ortu_menikah,
        nama_wali_baptis,
        tgl_krisma_wali_baptis,
        ketua_lingkungan,
        ketua_lingkungan_approval,
        id_sekretariat,
        sekretariat_approval,
    } = req.body
    let updated_at = getTodayDate()
    let { id } = req.params
    
    try {
        let sql = `SELECT * FROM Surat_Baptis_Anak WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE Surat_Baptis_Anak SET ? WHERE id=?`
            result = await db(sql, [ {
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
                                        ketua_lingkungan,
                                        ketua_lingkungan_approval,
                                        id_sekretariat,
                                        sekretariat_approval,
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
    getByIdKeluarga,
    post,
    update,
    remove
}