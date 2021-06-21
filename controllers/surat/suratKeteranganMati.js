const db = require('../../connection')
const { getTodayDate, generateNomorSurat } = require('../../utils')

const getAll = async (req, res) => {
    try {
        let sql = 
            `SELECT S.id,
                    S.no_surat,
                    S.id_keluarga,
                    S.id_lingkungan,
                    S.id_umat,
                    U.nama,
                    U.nama_baptis,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    S.tempat_meninggal,
                    S.tgl_meninggal,
                    S.tempat_makam_kremasi,
                    S.tgl_makam_kremasi,
                    S.tgl_komuni,
                    S.pelayan_komuni,
                    S.tgl_pengampunan_dosa,
                    S.pelayan_pengampunan_dosa,
                    S.tgl_perminyakan,
                    S.pelayan_perminyakan,
                    S.tgl_baptis_darurat,
                    S.pelayan_baptis_darurat,
                    S.id_imam_pemberkat,
                    S.imam_pemberkat_approval,
                    S.nama_pelapor,
                    S.no_hp_pelapor,
                    S.no_hp_penanggungjawab,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM Surat_Keterangan_Mati S JOIN Umat U ON (S.id_umat=U.id)`
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
                    U.nama_baptis,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    D.id_ayah,
                    D.id_ibu,
                    S.nama_pasangan,
                    S.tempat_meninggal,
                    S.tgl_meninggal,
                    S.tempat_makam_kremasi,
                    S.tgl_makam_kremasi,
                    S.tgl_komuni,
                    S.pelayan_komuni,
                    S.tgl_pengampunan_dosa,
                    S.pelayan_pengampunan_dosa,
                    S.tgl_perminyakan,
                    S.pelayan_perminyakan,
                    S.tgl_baptis_darurat,
                    S.pelayan_baptis_darurat,
                    S.id_imam_pemberkat,
                    I.nama AS nama_imam,
                    S.imam_pemberkat_approval,
                    S.nama_pelapor,
                    S.no_hp_pelapor,
                    S.no_hp_penanggungjawab,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM Surat_Keterangan_Mati S JOIN Umat U ON (S.id_umat=U.id)
                JOIN Detail_Umat D ON (U.id=D.id_umat) 
                JOIN Admin I ON (S.id_imam_pemberkat=I.id)
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
                    U.nama_baptis,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    D.id_ayah,
                    D.id_ibu,
                    S.nama_pasangan,
                    S.tempat_meninggal,
                    S.tgl_meninggal,
                    S.tempat_makam_kremasi,
                    S.tgl_makam_kremasi,
                    S.tgl_komuni,
                    S.pelayan_komuni,
                    S.tgl_pengampunan_dosa,
                    S.pelayan_pengampunan_dosa,
                    S.tgl_perminyakan,
                    S.pelayan_perminyakan,
                    S.tgl_baptis_darurat,
                    S.pelayan_baptis_darurat,
                    S.id_imam_pemberkat,
                    I.nama AS nama_imam,
                    S.imam_pemberkat_approval,
                    S.nama_pelapor,
                    S.no_hp_pelapor,
                    S.no_hp_penanggungjawab,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM Surat_Keterangan_Mati S JOIN Umat U ON (S.id_umat=U.id)
                JOIN Detail_Umat D ON (U.id=D.id_umat) 
                JOIN Admin I ON (S.id_imam_pemberkat=I.id)
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
                    S.id_umat,
                    U.nama,
                    U.nama_baptis,
                    U.tempat_lahir,
                    U.tgl_lahir,
                    U.alamat,
                    D.id_ayah,
                    D.id_ibu,
                    S.nama_pasangan,
                    S.tempat_meninggal,
                    S.tgl_meninggal,
                    S.tempat_makam_kremasi,
                    S.tgl_makam_kremasi,
                    S.tgl_komuni,
                    S.pelayan_komuni,
                    S.tgl_pengampunan_dosa,
                    S.pelayan_pengampunan_dosa,
                    S.tgl_perminyakan,
                    S.pelayan_perminyakan,
                    S.tgl_baptis_darurat,
                    S.pelayan_baptis_darurat,
                    S.id_imam_pemberkat,
                    I.nama AS nama_imam,
                    S.imam_pemberkat_approval,
                    S.nama_pelapor,
                    S.no_hp_pelapor,
                    S.no_hp_penanggungjawab,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at 
            FROM Surat_Keterangan_Mati S JOIN Umat U ON (S.id_umat=U.id)
                JOIN Detail_Umat D ON (U.id=D.id_umat) 
                JOIN Admin I ON (S.id_imam_pemberkat=I.id)
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
            id_umat,
            nama_pasangan,
            tempat_meninggal,
            tgl_meninggal,
            tempat_makam_kremasi,
            tgl_makam_kremasi,
            tgl_komuni,
            pelayan_komuni,
            tgl_pengampunan_dosa,
            pelayan_pengampunan_dosa,
            tgl_perminyakan,
            pelayan_perminyakan,
            tgl_baptis_darurat,
            pelayan_baptis_darurat,
            nama_pelapor,
            no_hp_pelapor,
            no_hp_penanggungjawab,
            id_imam_pemberkat,
            ketua_lingkungan,
            isKetuaLingkungan,
        } = req.body,
        created_at = getTodayDate(),
        id_sekretariat = null,
        sekretariat_approval = null,
        imam_pemberkat_approval = null,
        ketua_lingkungan_approval = isKetuaLingkungan ? 1 : 0
        if(!isKetuaLingkungan) ketua_lingkungan = null

    try {
        let sql = `INSERT INTO Surat_Keterangan_Mati SET ?`
        let result = await db(sql, [
            {
                no_surat,
                id_keluarga,
                id_lingkungan,
                id_umat,
                nama_pasangan,
                tempat_meninggal,
                tgl_meninggal,
                tempat_makam_kremasi,
                tgl_makam_kremasi,
                tgl_komuni,
                pelayan_komuni,
                tgl_pengampunan_dosa,
                pelayan_pengampunan_dosa,
                tgl_perminyakan,
                pelayan_perminyakan,
                tgl_baptis_darurat,
                pelayan_baptis_darurat,
                nama_pelapor,
                no_hp_pelapor,
                no_hp_penanggungjawab,
                id_imam_pemberkat,
                imam_pemberkat_approval,
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
        id_umat,
        nama_pasangan,
        tempat_meninggal,
        tgl_meninggal,
        tempat_makam_kremasi,
        tgl_makam_kremasi,
        tgl_komuni,
        pelayan_komuni,
        tgl_pengampunan_dosa,
        pelayan_pengampunan_dosa,
        tgl_perminyakan,
        pelayan_perminyakan,
        tgl_baptis_darurat,
        pelayan_baptis_darurat,
        nama_pelapor,
        no_hp_pelapor,
        no_hp_penanggungjawab,
        id_imam_pemberkat,
        imam_pemberkat_approval,
        ketua_lingkungan,
        ketua_lingkungan_approval,
        id_sekretariat,
        sekretariat_approval,
    } = req.body
    let updated_at = getTodayDate()
    let { id } = req.params
    
    try {
        let sql = `SELECT * FROM Surat_Keterangan_Mati WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE Surat_Keterangan_Mati SET ? WHERE id=?`
            result = await db(sql, [ {
                                        no_surat,
                                        id_keluarga,
                                        id_lingkungan,
                                        id_umat,
                                        nama_pasangan,
                                        tempat_meninggal,
                                        tgl_meninggal,
                                        tempat_makam_kremasi,
                                        tgl_makam_kremasi,
                                        tgl_komuni,
                                        pelayan_komuni,
                                        tgl_pengampunan_dosa,
                                        pelayan_pengampunan_dosa,
                                        tgl_perminyakan,
                                        pelayan_perminyakan,
                                        tgl_baptis_darurat,
                                        pelayan_baptis_darurat,
                                        nama_pelapor,
                                        no_hp_pelapor,
                                        no_hp_penanggungjawab,
                                        id_imam_pemberkat,
                                        imam_pemberkat_approval,
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
        let sql = `SELECT * FROM Surat_Keterangan_Mati WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =  `UPDATE Surat_Keterangan_Mati SET ? WHERE id=?`
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
    remove
}