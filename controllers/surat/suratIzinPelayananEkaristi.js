const db = require('../../connection')
const { getTodayDate, getDateTime, generateNomorSurat } = require('../../utils')

const getAll = async (req, res) => {
  try {
    let sql =
      `SELECT S.id,
              S.no_surat,
              S.id_keluarga,
              S.id_lingkungan,
              L.nama_lingkungan,
              S.tgl_pelaksanaan,
              S.waktu_mulai,
              S.waktu_selesai,
              S.intensi,
              S.lokasi_rumah,
              S.no_telp_lokasi,
              S.romo_pemimpin,
              S.alamat_komunitas,
              S.no_telp_komunitas,
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
      FROM Surat_Izin_Pelayanan_Ekaristi S JOIN Lingkungan L ON (S.id_lingkungan=L.id)`
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
              K.nama_keluarga,
              K.nama_kepala_keluarga,
              K.no_telp_kepala_keluarga,
              S.id_lingkungan,
              L.nama_lingkungan,
              S.tgl_pelaksanaan,
              S.waktu_mulai,
              S.waktu_selesai,
              S.intensi,
              S.lokasi_rumah,
              S.no_telp_lokasi,
              S.romo_pemimpin,
              S.alamat_komunitas,
              S.no_telp_komunitas,
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
      FROM Surat_Izin_Pelayanan_Ekaristi S JOIN Lingkungan L ON (S.id_lingkungan=L.id)
          JOIN Keluarga K ON (S.id_keluarga=K.id)
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
                  L.nama_lingkungan,
                  S.tgl_pelaksanaan,
                  S.waktu_mulai,
                  S.waktu_selesai,
                  S.intensi,
                  S.lokasi_rumah,
                  S.no_telp_lokasi,
                  S.romo_pemimpin,
                  S.alamat_komunitas,
                  S.no_telp_komunitas,
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
          FROM Surat_Izin_Pelayanan_Ekaristi S JOIN Lingkungan L ON (S.id_lingkungan=L.id)
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
                  L.nama_lingkungan,
                  S.tgl_pelaksanaan,
                  S.waktu_mulai,
                  S.waktu_selesai,
                  S.intensi,
                  S.lokasi_rumah,
                  S.no_telp_lokasi,
                  S.romo_pemimpin,
                  S.alamat_komunitas,
                  S.no_telp_komunitas,
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
          FROM Surat_Izin_Pelayanan_Ekaristi S JOIN Lingkungan L ON (S.id_lingkungan=L.id)
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
  let {
        id_keluarga,
        id_lingkungan,
        tgl_pelaksanaan,
        waktu_mulai,
        waktu_selesai,
        intensi,
        lokasi_rumah,
        no_telp_lokasi,
        romo_pemimpin,
        alamat_komunitas,
        no_telp_komunitas,
        ketua_lingkungan,
        isKetuaLingkungan,
      } = req.body,
      created_at = getTodayDate(),
      ketua_lingkungan_approval = 0,
      ketua_lingkungan_approval_stamp = null
  
  let no_surat = await generateNomorSurat('F1', id_lingkungan, 'Surat_Izin_Pelayanan_Ekaristi')
      
  if(isKetuaLingkungan === true) {
    ketua_lingkungan_approval = 1
    ketua_lingkungan_approval_stamp = getDateTime()
  } else  {
    ketua_lingkungan = null
  }

  try {
      let sql = `INSERT INTO Surat_Izin_Pelayanan_Ekaristi SET ?`
      let result = await db(sql, [
          {
              no_surat,
              id_keluarga,
              id_lingkungan,
              tgl_pelaksanaan,
              waktu_mulai,
              waktu_selesai,
              intensi,
              lokasi_rumah,
              no_telp_lokasi,
              romo_pemimpin,
              alamat_komunitas,
              no_telp_komunitas,
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
      tgl_pelaksanaan,
      waktu_mulai,
      waktu_selesai,
      intensi,
      lokasi_rumah,
      no_telp_lokasi,
      romo_pemimpin,
      alamat_komunitas,
      no_telp_komunitas,
  } = req.body
  let updated_at = getTodayDate()
  let { id } = req.params

  try {
      let sql = `SELECT * FROM Surat_Izin_Pelayanan_Ekaristi WHERE id = ?`
      let result = await db(sql, [ id ])

      if (result.length === 0) {
          res.status(404).send({
              message: "Data not found",
          })
      } else {
          sql = `UPDATE Surat_Izin_Pelayanan_Ekaristi SET ? WHERE id=?`
          result = await db(sql, [ {
                                      id_keluarga,
                                      id_lingkungan,
                                      tgl_pelaksanaan,
                                      waktu_mulai,
                                      waktu_selesai,
                                      intensi,
                                      lokasi_rumah,
                                      no_telp_lokasi,
                                      romo_pemimpin,
                                      alamat_komunitas,
                                      no_telp_komunitas,
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
      let sql = `SELECT * FROM Surat_Izin_Pelayanan_Ekaristi WHERE id = ?`
      let result = await db(sql, [ id ])
      
      if (result.length === 0) {
          res.status(404).send({
              message: "Data not found",
          })
      } else {
          sql =  `UPDATE Surat_Izin_Pelayanan_Ekaristi SET ? WHERE id=?`
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
      let sql = `SELECT * FROM Surat_Izin_Pelayanan_Ekaristi WHERE id = ?`
      let result = await db(sql, [ id ])

      if (result.length === 0) {
          res.status(404).send({
              message: "Data not found",
          })
      } else {
          sql =  `UPDATE Surat_Izin_Pelayanan_Ekaristi SET ? WHERE id=?`
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