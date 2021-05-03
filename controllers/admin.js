const db = require('../connection')

const getAll = async (req, res) => {
    let sql = 'SELECT * FROM Admin'

    db.query(sql, (error, result) => {
        if(error) {
            console.log(error)
        }
        else {
            res.json({
                'message' : 'success',
                'result' : result
            })
        }
    })
    // try {
    //     let admins = await query(sql)
        
    //     res.send({
    //         message: "Success retrieving data",
    //         admins: admins,
    //     })
    // } catch (e) {
    //     res.send({
    //         message: "Failed to retrieve data",
    //         error: e.message
    //     })
    //     console.log(e)
    // }
}

const getById = (req, res) => {
    let sql = `SELECT * FROM Admin WHERE id = ?`

    db.query(sql, [ req.params.id ], (error, result) => {
        if(error) {
            console.log(error)
        } else {
            res.json({
                'message' : 'success',
                'result' : result
            })
        }
    })
}

const post = (req, res) => {
    let password = generatePassword(6)

    let data = [
        req.body.nama,
        req.body.email,
        password,
        req.body.role,
    ]

    let sql =
        `INSERT INTO Admin (
            nama,
            email,
            password,
            role
        ) VALUES (
            ?,
            ?,
            ?,
            ?
        )`
    
    db.query(sql, data, (error, result) => {
        if(error) {
            console.log(error)
        }
        else {
            res.json({
                'message' : 'success add admin',
                'result' : result
            })
        }
    })
}

const update = (req, res) => {
    let data = [
        req.body.nama,
        req.body.email,
        req.body.role,
    ]
    console.log(req.params.id)

    let sql = 
        `UPDATE Admin SET
            nama=?,
            email=?,
            role=?
        WHERE id=?`

    db.query(sql, [ ...data, req.params.id ], (error, result) => {
        if(error) {
            console.log(error)
        }
        else {
            res.json({
                'message' : 'success edit admin',
                'result' : result
            })
        }
    })
}

const remove = (req, res) => {
    let sql =  `DELETE FROM Admin WHERE id=?`
    db.query(sql, [ req.params.id], (error, result) => {
        if(error) {
            console.log(error)
        }
        else {
            res.json({
                'message' : 'success deleted admin',
                'result' : result
            })
        }
    })
}

const generatePassword = (length) => {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

module.exports = {
    getAll,
    getById,
    post,
    update,
    remove
}