const db = require('../models')
const Admin = db.admin
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken')
const { compareSync } = require('bcryptjs')
const { generateRandomString, hashPassword } = require('../utils')

const getAll = async (req, res) => {
  try {
    let admins = await Admin.findAll({
      attributes: { exclude: [ 'password' ] }
    })
    
    res.status(200).send({
      message: "Success retrieving data",
      result: admins,
    })
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve data",
      error: error
    })
  }
}

const getAllByRole = async (req, res) => {
  let { roleId } = req.params
  try {
    let admins = await Admin.findAll({
      attributes: { exclude: [ 'password' ] },
      where: { role: roleId }
    })
    res.status(200).send({
      message: "Success retrieving data",
      result: admins,
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
    let result = await Admin.findByPk(id, {
      attributes: { exclude: [ 'password' ] },
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
    let plainPassword = generateRandomString(6)
    let password = hashPassword(plainPassword)
    let data = { ...req.body, password }
    
    let result = await Admin.create(data)
    
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

  try {
    let result = await Admin.update(req.body, {
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
    let result = await Admin.destroy({
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

const login = async (req, res) => {
  let { email, password } = req.body

  try {
    let admin = await Admin.findOne({
      where: { email: email },
    })
  
    if(admin === null) {
      res.status(404).send({
        message: "Invalid email or password",
      })
    }
    else {
      if(compareSync(password, admin.password)) {
        admin.password = undefined
        let token = jwt.sign({
          admin: admin
        }, process.env.JWT_SECRET_KEY, { expiresIn: "9999h"})
        res.status(200).send({
          message: "Success logged in",
          token: token
        })
      } else {
        res.status(401).send({
          message: "Invalid email or password",
        })
      }
    }
  } catch (error) {
    res.status(500).send({
      error: true,
      message:error
    })
  }
}

module.exports = {
  getAll,
  getAllByRole,
  getById,
  post,
  update,
  remove,

  login,
}