const db = require('../models')
const DetailUmat = db.detailUmat

const getAll = async (req, res) => {
  try {
    let result = await DetailUmat.findAll()

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

const getByIdUmat = async (req, res) => {
  const { idUmat } = req.params

  try {
    let result = await DetailUmat.findOne({
      where: { id_umat: idUmat }
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
  try {
    let result = await DetailUmat.create(req.body)
    
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
  let { idUmat } = req.params
  
  try {
    let result = await DetailUmat.update(req.body, {
      where: { id_umat: idUmat }
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
  let { idUmat } = req.params

  try {
    let result = await DetailUmat.destroy({
      where: { id_umat: idUmat }
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
    getByIdUmat,
    post,
    update,
    remove
}