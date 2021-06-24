const db = require('../../connection')
const { getTodayDate, generateNomorSurat } = require('../../utils')

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
                    DATE_FORMAT(S.tgl_lahir, '%d-%m-%Y') AS tgl_lahir,
                    S.alamat,
                    S.nama_pasangan,
                    S.cara_menikah,
                    S.tahun_menikah,
                    S.status_terima_minyak,
                    S.tgl_terima_minyak,
                    S.id_pastor_pelayan,
                    R.nama_pastor_pelayan,
                    S.pastor_pelayan_approval,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM Surat_Pelayanan_Minyak_Suci S JOIN (SELECT id AS id_pastor_pelayan, nama AS nama_pastor_pelayan FROM Admin) R ON (S.id_pastor_pelayan=R.id_pastor_pelayan)`
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
                    DATE_FORMAT(S.tgl_lahir, '%d-%m-%Y') AS tgl_lahir,
                    S.alamat,
                    S.nama_pasangan,
                    S.cara_menikah,
                    S.tahun_menikah,
                    S.status_terima_minyak,
                    DATE_FORMAT(S.tgl_terima_minyak, '%d-%m-%Y') AS tgl_terima_minyak,
                    S.id_pastor_pelayan,
                    R.nama_pastor_pelayan,
                    S.pastor_pelayan_approval,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM Surat_Pelayanan_Minyak_Suci S JOIN (SELECT id AS id_pastor_pelayan, nama AS nama_pastor_pelayan FROM Admin) R ON (S.id_pastor_pelayan=R.id_pastor_pelayan)
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
                    DATE_FORMAT(S.tgl_lahir, '%d-%m-%Y') AS tgl_lahir,
                    S.alamat,
                    S.nama_pasangan,
                    S.cara_menikah,
                    S.tahun_menikah,
                    S.status_terima_minyak,
                    DATE_FORMAT(S.tgl_terima_minyak, '%d-%m-%Y') AS tgl_terima_minyak,
                    S.id_pastor_pelayan,
                    R.nama_pastor_pelayan,
                    S.pastor_pelayan_approval,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM Surat_Pelayanan_Minyak_Suci S JOIN (SELECT id AS id_pastor_pelayan, nama AS nama_pastor_pelayan FROM Admin) R ON (S.id_pastor_pelayan=R.id_pastor_pelayan)
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
                    DATE_FORMAT(S.tgl_lahir, '%d-%m-%Y') AS tgl_lahir,
                    S.alamat,
                    S.nama_pasangan,
                    S.cara_menikah,
                    S.tahun_menikah,
                    S.status_terima_minyak,
                    DATE_FORMAT(S.tgl_terima_minyak, '%d-%m-%Y') AS tgl_terima_minyak,
                    S.id_pastor_pelayan,
                    R.nama_pastor_pelayan,
                    S.pastor_pelayan_approval,
                    S.ketua_lingkungan,
                    S.ketua_lingkungan_approval,
                    S.id_sekretariat,
                    S.sekretariat_approval,
                    DATE_FORMAT(S.created_at, '%d-%m-%Y') AS created_at,
                    DATE_FORMAT(S.updated_at, '%d-%m-%Y') AS updated_at,
                    DATE_FORMAT(S.deleted_at, '%d-%m-%Y') AS deleted_at
            FROM Surat_Pelayanan_Minyak_Suci S JOIN (SELECT id AS id_pastor_pelayan, nama AS nama_pastor_pelayan FROM Admin) R ON (S.id_pastor_pelayan=R.id_pastor_pelayan)
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
    let no_surat = generateNomorSurat("F9"),
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
        id_sekretariat = null,
        sekretariat_approval = null,
        pastor_pelayan_approval = null,
        ketua_lingkungan_approval = isKetuaLingkungan ? 1 : 0
        if(isKetuaLingkungan === false) ketua_lingkungan = null

    try {
        let sql = `INSERT INTO Surat_Pelayanan_Minyak_Suci SET ?`
        let result = await db(sql, [
            {
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
                pastor_pelayan_approval,
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
        pastor_pelayan_approval,
        ketua_lingkungan,
        ketua_lingkungan_approval,
        id_sekretariat,
        sekretariat_approval,
    } = req.body
    let updated_at = getTodayDate()
    let { id } = req.params
    
    try {
        let sql = `SELECT * FROM Surat_Pelayanan_Minyak_Suci WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE Surat_Pelayanan_Minyak_Suci SET ? WHERE id=?`
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
                                        pastor_pelayan_approval,
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
        let sql = `SELECT * FROM Surat_Pelayanan_Minyak_Suci WHERE id = ?`
        let result = await db(sql, [ id ])
        
        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql =  `UPDATE Surat_Pelayanan_Minyak_Suci SET ? WHERE id=?`
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
    remove
}