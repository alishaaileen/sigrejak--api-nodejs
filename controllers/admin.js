require('dotenv').config();
const db = require('../connection')
const jwt = require('jsonwebtoken')
const {compareSync } = require('bcryptjs')
const { generateRandomString, hashPassword } = require('../utils')

const getAll = async (req, res) => {
    try {
        let sql = `SELECT id, nama, email, no_telp, role FROM Admin`
        let admins = await db(sql)

        res.status(200).send({
            message: "Success retrieving data",
            result: admins,
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed to retrieve data",
            error: error.message
        })
    }
}

const getAllByRole = async (req, res) => {
    let { roleId } = req.params

    try {
        let sql = `SELECT id, nama, email, no_telp, role FROM Admin WHERE role=?`
        let admins = await db(sql, [ roleId ])

        res.status(200).send({
            message: "Success retrieving data",
            result: admins,
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
    let { id } = req.params
    
    try {
        let sql = 
            `SELECT id, nama, email, no_telp, role 
            FROM Admin WHERE id = ?`

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

const post = async (req, res) => {
    try {
        let plainPassword = generateRandomString(6)
        console.log(plainPassword)
        let password = hashPassword(plainPassword)
        let { nama, email, no_telp, role } = req.body
    
        let sql =
            `INSERT INTO Admin SET ?`
        
        let result = await db(sql, [ 
            {
                nama,
                email,
                no_telp,
                password,
                role
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
    const { nama, email, no_telp, role } = req.body
    const { id } = req.params

    try {
        let sql = `SELECT * FROM Admin WHERE id = ?`
        let result = await db(sql, [ id ])

        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE Admin SET ? WHERE id=?`
            result = await db(sql, [ {nama, email, no_telp, role}, id ]) 
            
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
    let { id } = req.params

    try {
        let sql = `SELECT * FROM Admin WHERE id = ?`
        let result = await db(sql, [ id ])

        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `DELETE FROM Admin WHERE id=?`
            result = await db(sql, [ id ])
    
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

const login = async (req, res) => {
    let { email, password } = req.body

    try {
        let sql = `SELECT * FROM Admin WHERE email=?`

        let admin = await db(sql,  email )
     
        if(admin.length === 0) {
            res.status(404).send({
                message: "Invalid email or password",
            })
        }
        else {
            if(compareSync(password, admin[0].password)) {
                admin[0].password = undefined
                let token = jwt.sign({
                    admin: admin
                }, process.env.JWT_SECRET_KEY, { expiresIn: "1000h"})
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