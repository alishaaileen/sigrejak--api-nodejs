var mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sigrejak',
    port: '3306'
})

db.connect((err) => {
    if(err) throw err;
    console.log("connected to DB")
})

module.exports = db