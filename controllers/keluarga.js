require('dotenv').config();
const db = require('../connection')
const jwt = require('jsonwebtoken')
const {compareSync } = require('bcryptjs')
const { generateRandomString, hashPassword } = require('../utils')

const getAll = async (req, res) => {
    try {
        let sql = `SELECT id, nama_keluarga, email, username, is_ketua_lingkungan FROM Keluarga`
        let families = await db(sql)

        res.status(200).send({
            message: "Success retrieving data",
            result: families,
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
        let sql = `SELECT id, nama_keluarga, email, username, is_ketua_lingkungan FROM Keluarga WHERE id = ?`

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
        let is_ketua_lingkungan = 0
        let {
            nama_keluarga,
            username,
            email,
        } = req.body
    
        let sql =
            `INSERT INTO Keluarga SET ?`
        
        let result = await db(sql, [ 
            {
                nama_keluarga,
                username,
                email,
                password,
                is_ketua_lingkungan,
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
    const {
        nama_keluarga,
        username,
        email,
        is_ketua_lingkungan,
    } = req.body
    console.log(req.body)
    const { id } = req.params

    try {
        let sql = `SELECT * FROM Keluarga WHERE id = ?`
        let result = await db(sql, [ id ])

        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE Keluarga SET ? WHERE id=?`
            result = await db(sql, [ {
                nama_keluarga,
                username,
                email,
                is_ketua_lingkungan,
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
    let { id } = req.params

    try {
        let sql = `SELECT * FROM Keluarga WHERE id = ?`
        let result = await db(sql, [ id ])

        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `DELETE FROM Keluarga WHERE id=?`
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
    let { username, password } = req.body

    try {
        let sql = `SELECT * FROM Keluarga WHERE username=?`

        let family = await db(sql, username )
     
        if(family.length === 0) {
            res.status(404).send({
                message: "Invalid username or password",
            })
        }
        else {
            if(compareSync(password, family[0].password)) {
                family[0].password = undefined
                let token = jwt.sign({
                    family: family
                }, process.env.JWT_SECRET_KEY, { expiresIn: "1000h"})
                res.status(200).send({
                    message: "Success logged in",
                    token: token
                })
            } else {
                res.status(401).send({
                    message: "Invalid username or password",
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
}

module.exports = {
    getAll,
    getById,
    post,
    update,
    remove,

    login,
}