const db = require('../models')
const Umat = db.umat
const Op = db.Sequelize.Op
const { getTodayDate } = require('../utils')

const getAll = async (req, res) => {
  try {
    let result = await Umat.findAll()
    
    res.status(200).send({
      message: "Success retrieving data",
      result: result,
    })
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve data",
      error: error
    })
  }
}

const getFamilyMember = async (req, res) => {
  let { idFamily } = req.params

  try {
    let result = await Umat.findAll({
      where: {
        keluarga_id: idFamily
      }
    })

    res.status(200).send({
      message: "Success retrieving data",
      result: result,
    })
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve data",
      error: error
    })
  }
}

const getById = async (req, res) => {
  let { id } = req.params

  try {
    let result = await Umat.findByPk(id, {
      where: {
        deleted_at: null
      }
    })
    res.status(200).send({
      message: "Success retrieving data",
      result: result,
    })
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve data",
      error: error
    })
  }
}

const post = async (req, res) => {
  try {
    let created_at = getTodayDate()
    let data = { ...req.body, created_at }
    console.log(data)
    
    let result = await Umat.create(data)

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
  const { id } = req.params
  let updated_at = getTodayDate()
  let data = { ...req.body, updated_at }

  try {
    let result = await Umat.update(data, {
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
    res.status(500).send({
      message: "Failed updating data",
      error: error,
    })
  }
}

const remove = async (req, res) => {
  let { id } = req.params
  try {
    let result = await Umat.destroy({
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
    getFamilyMember,
    getById,
    post,
    update,
    remove
}