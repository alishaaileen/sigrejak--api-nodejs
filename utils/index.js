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

const getTodayDate = () => {
    // current timestamp in milliseconds
    let ts = Date.now(),

        date_ob = new Date(ts),
        date = date_ob.getDate(),
        month = date_ob.getMonth() + 1,
        year = date_ob.getFullYear(),

    // concat date & time in YYYY-MM-DD format
        fullDate = `${year}/${month}/${date}`
    
    return fullDate
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

const generateNomorSurat = (kodeSurat) => {
    // current timestamp in milliseconds
    let ts = Date.now(),
        date_ob = new Date(ts),
        month = date_ob.getMonth() + 1,
        year = date_ob.getFullYear(),
        number = Math.floor(Math.random() * 1000) + 1;
    
    // 015 is the code for Paroki of Kumetiran
    return `015.${kodeSurat}/${number}/${month}/${year}`
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
    getTodayDate,
    checkUser,
    generateNomorSurat,
    generateFileName,
    deleteFile,
}