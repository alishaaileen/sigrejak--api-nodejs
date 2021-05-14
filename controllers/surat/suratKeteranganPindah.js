const db = require('../../models')
const SuratKeteranganPindah = db.suratKeteranganPindah
const { getTodayDate } = require('../../utils')

const getAll = async (req, res) => {
  try {
    let result = await SuratKeteranganPindah.findAll()

    res.status(200).send({
      message: "Success retrieving data",
      result: result,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Failed to retrieve data",
      error: error
    })
  }
}

const getById = async (req, res) => {
  const { id } = req.params

  try {
    let result = await findByPk(id)

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
    console.log(error)
    res.status(500).send({
      message: "Failed to retrieve data",
      error: error
    })
  }
}

const getByIdKeluarga = async (req, res) => {
  const { id } = req.params

  try {
    let result = await SuratKeteranganPindah.findAll({
      where: { id_keluarga: id }
    })

    res.status(200).send({
      message: "Success retrieving data",
      result: result,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
        message: "Failed to retrieve data",
        error: error
    })
  }
}

const post = async (req, res) => {
  let no_surat = 0,
      id_sekretariat = 0,
      sekretariat_approval = 0,
      id_romo = null,
      romo_approval = 0,
      created_at = getTodayDate(),
      data = {
                ...req.body,
                no_surat,
                id_sekretariat,
                sekretariat_approval,
                id_romo,
                romo_approval,
                created_at,
              }

  try {
    let result = await SuratKeteranganPindah.create(data)
    
    res.status(200).send({
      message: "Success adding data",
      result: result,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Failed adding data",
      error: error,
    })
  }
}

const update = async (req, res) => {
  // let {
  //     no_surat,
  //     id_keluarga,
  //     id_paroki_lama,
  //     id_lingkungan_lama,
  //     ketua_lingkungan,
  //     id_umat,
  //     alamat_lama,
  //     no_telp_lama,
  //     tgl_mulai_domisili,
  //     alamat_baru,
  //     no_telp_baru,
  //     id_lingkungan_baru,
  //     id_paroki_baru,
  //     ketua_lingkungan_approval,
  //     id_sekretariat,
  //     sekretariat_approval,
  //     id_romo,
  //     romo_approval,
  // } = req.body
  let updated_at = getTodayDate(),
      { id } = req.params,
      data = { ...req.body, updated_at }
  
  try {
    let result = await SuratKeteranganPindah.update(req.body, {
      where: { id: id }
    })
    
    if (result[0] === 1) {
      res.status(200).send({
        message: "Success updating data",
        result: result,
      })
    } else {
      res.status(404).send({
        message: "Data not found or no value is changed",
        result: result,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Failed updating data",
      error: error,
    })
  }
}

const remove = async (req, res) => {
  let { id } = req.params

  try {
    let result = await SuratKeteranganPindah.destroy({
      where: { id: id }
    })
    
    if (result === 1) {
      res.status(200).send({
        message: "Success deleting data",
        result: result,
      })
    } else {
      res.status(404).send({
        message: "Data not found",
        result: result,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Failed deleting data",
      error: error,
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