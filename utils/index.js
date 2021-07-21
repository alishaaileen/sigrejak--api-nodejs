const db = require('../connection')
const jwt = require('jsonwebtoken')
    , { hashSync, genSaltSync } = require('bcryptjs')
    , fs = require('fs')

const generateRandomString = (length) => {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

const hashPassword = (plainPassword) => {
    const salt = genSaltSync(10)
    return hashSync(plainPassword, salt)
}

const getKodeLingkungan = async (idLingkungan) => {
    const temp = await db('SELECT kode FROM Lingkungan WHERE id=?', idLingkungan)

    return temp[0].kode
}

const getTodayDate = () => {
    // current timestamp in milliseconds
    let today = Date.now()
      , date = new Date(today)

    // concat date & time in YYYY-MM-DD format
    let fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    
    return fullDate
}

const getDateTime = () => {
    const fullDate = getTodayDate()
    const temp = Date.now()
    const today = new Date(temp)
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    
    return (fullDate + ' ' + time)
}

const checkUser = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        // Remove Bearer from string
        token = token.slice(7);
        
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
            return res.json({
                message: "Invalid token",
            });
            } else {
                req.user = decodedToken;
                res.json(decodedToken);
            }
        });
    } else {
        return res.json({
            success: 0,
            message: "Invalid token"
        });
    }
}

const getJumlahSuratBasedOnTahun = async (tableName, year) => {
    const sql = `SELECT COUNT(id) AS jumlah
                FROM ${tableName}
                WHERE YEAR(created_at) = ${year}`
    
    let result = await db(sql)

    return result[0].jumlah
}

const getJumlahSuratNotApproved = async (jenisSurat, approval) => {
    try {
        let sql =
            `SELECT COUNT(id) AS jumlah_not_approved
            FROM ${tableName}
            WHERE deleted_at IS NULL AND ${approval} != 1`
            let result = await db(sql)
  
        res.status(200).send({
            message: "Success retrieving data",
            result: result,
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: "Failed to retrieve data",
            error: error.message
        })
    }
}

const generateNomorSurat = async (kodeSurat, idLingkungan, tableName) => {
    // Get waktu saat ini untuk menentukan bulan dan tahun
    let ts = Date.now(),
        date_ob = new Date(ts),
        month = date_ob.getMonth() + 1,
        year = date_ob.getFullYear(),
        lastNumber = await getJumlahSuratBasedOnTahun(tableName, year)

    // Pengubahan 2 digit
    idLingkungan = idLingkungan < 10 ? `0${idLingkungan}` : idLingkungan
    month = month < 10 ? `0${month}` : month
    
    // 015 is the code for Paroki of Kumetiran
    return `015.${kodeSurat}.${idLingkungan}/${lastNumber + 1}/${month}/${year}`
}

const generateFileName = (kode, fileType) => {
    return `${kode}-${generateRandomString(50)}${fileType}`
} 

const deleteFile = async (pathToFiles, fileName) => {
    fs.unlink(`${pathToFiles}${fileName}`, (err) => {
        if (err) {
            console.error(err)
            return false
        }
        console.log("file berhasil dihapus")
        return true
    })
}

module.exports = {
    generateRandomString,
    hashPassword,
    getKodeLingkungan,
    getTodayDate,
    getDateTime,
    checkUser,
    generateNomorSurat,
    getJumlahSuratNotApproved,
    generateFileName,
    deleteFile,
}