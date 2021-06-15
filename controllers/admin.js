require('dotenv').config();
const db = require('../connection')
const jwt = require('jsonwebtoken')
const {compareSync } = require('bcryptjs')
const { generateRandomString, hashPassword } = require('../utils')
const { getTodayDate } = require('../utils')

const getAll = async (req, res) => {
    try {
        let sql = 
            `SELECT id, nama, email, no_telp, role 
            FROM Admin
            WHERE deleted_at IS NULL`
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
        let sql = 
            `SELECT id, nama, email, no_telp, role 
            FROM Admin 
            WHERE role=?`
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
        let created_at = getTodayDate()
    
        let sql =
            `INSERT INTO Admin SET ?`
        
        let result = await db(sql, [ 
            {
                nama,
                email,
                no_telp,
                password,
                role,
                created_at
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
    const updated_at = getTodayDate()
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
            result = await db(sql, [ {nama, email, no_telp, role, updated_at}, id ]) 
            
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

const setAsRomoParoki = async (req, res) => {
    const updated_at = getTodayDate()
        , role = 3
        , { id } = req.body

    try {
        let sql = `UPDATE Admin SET role=4 WHERE role=3`
        let result = await db(sql)

        sql = `UPDATE Admin SET ? WHERE id=?`
        result = await db(sql, [ {role, updated_at}, id ]) 
        
        res.status(200).send({
            message: "Success change romo as romo paroki",
            result: result,
        })
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
    let deleted_at = getTodayDate()

    try {
        let sql = `SELECT * FROM Admin WHERE id = ?`
        let result = await db(sql, [ id ])

        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            sql = `UPDATE Admin SET ? WHERE id=?`
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
                let token = jwt.sign({
                    id: admin[0].id
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

const changePassword = async (req, res) => {
    const {
        id,
        lama,
        baru
    } = req.body

    try {
        let sql = `SELECT * FROM Admin WHERE id = ?`
        let result = await db(sql, [ id ])

        if (result.length === 0) {
            res.status(404).send({
                message: "Data not found",
            })
        } else {
            if (compareSync(lama, result[0].password)) {
                let password = hashPassword(baru)
                sql = `UPDATE Admin SET ? WHERE id=?`
                result = await db(sql, [ {
                    password
                }, id ]) 
                
                res.status(200).send({
                    message: "Success updating data",
                    result: result,
                })
            } else {
                res.status(400).send({
                    message: "Password lama salah",
                })
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed updating data",
            error: error.message,
        })
    }
}

module.exports = {
    getAll,
    getAllByRole,
    getById,
    post,
    update,
    setAsRomoParoki,
    remove,

    login,
    changePassword,
}