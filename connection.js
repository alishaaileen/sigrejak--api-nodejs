var mysql = require('mysql');
const util = require('util')

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    port: process.env.DB_PORT
})

// db.connect((err) => {
//     if(err) throw err;
//     console.log("connected to DB")
// })

const db = util.promisify(conn.query).bind(conn)

module.exports = db