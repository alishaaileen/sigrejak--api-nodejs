const db = require('../models')
const Lingkungan = db.lingkungan
const Keluarga = db.keluarga

const getAll = async (req, res) => {
    try {
      // let sql =
      //     `SELECT L.id,
      //             L.ketua_lingkungan_id,
      //             L.nama_lingkungan,
      //             K.nama_keluarga "ketua_lingkungan",
      //             K.username,
      //             K.email
      //     FROM Lingkungan L JOIN Keluarga K ON (L.ketua_lingkungan_id=K.id)`
      let result = await Lingkungan.findAll({
        include: [{ 
          model: Keluarga,
          attributes: [
            'nama_keluarga',
            'username',
            'email'
          ]
        }],
        // raw: true
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

const getById = async (req, res) => {
    let { id } = req.params

    try {
        // let sql = 
        //     `SELECT L.id,
        //             L.ketua_lingkungan_id,
        //             L.nama_lingkungan,
        //             K.nama_keluarga "ketua_lingkungan",
        //             K.username,
        //             K.email
        //     FROM Lingkungan L JOIN Keluarga K ON (L.ketua_lingkungan_id=K.id) 
        //     WHERE L.id=?`
        let result = await findByPk(id, {
          attributes: [
            'id',
            'ketua_lingkungan_id',
            'nama_lingkungan',
            'nama_keluarga',
            'username',
            'email'
          ]
        },{
        include: [
          {
            model: Keluarga,
            as: 'Keluarga',
          }
        ]
      })

      res.status(200).send({
        message: "Success retrieving data",
        result: admins,
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
  try {
    // let sql =
    //     `INSERT INTO Lingkungan SET ?`
    let result = await Lingkungan.create(req.body)
    
    res.status(200).send({
      message: "Success adding data",
      result: result,
    })
  } catch (error) {
    res.status(500).send({
      message: "Failed adding data",
      error: error,
    })
  }
}

const update = async (req, res) => {
  let { id } = req.params
  
  try {
    let result = await Lingkungan.update(req.body, {
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
    let result = await Lingkungan.destroy({
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
      res.status(500).send({
          message: "Failed deleting data",
          error: error,
      })
  }
}

module.exports = {
    getAll,
    getById,
    post,
    update,
    remove
}