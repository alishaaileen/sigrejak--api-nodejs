const jwt = require('jsonwebtoken')
const { hashSync, genSaltSync } = require('bcryptjs')

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
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    // concat date & time in YYYY-MM-DD format
    let fullDate = `${year}/${month}/${date}`;
    
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

module.exports = {
    generateRandomString,
    hashPassword,
    getTodayDate,
    checkUser
}