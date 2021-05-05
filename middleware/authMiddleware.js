const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    // Remove Bearer from string
    token = token.slice(7);
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Invalid Token..."
        });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    return res.json({
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
}

module.exports = { validateToken }