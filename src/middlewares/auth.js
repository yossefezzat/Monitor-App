const jwt = require('jsonwebtoken')
const config = require('config')
// isverified account 
// api_key checker
const jwtSecret = config.get('token.jwtKey')

const authenticateToken = async (req, res, next) => {
  const authHeader = req.cookies.Authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401)
  }

  jwt.verify(token, jwtSecret, (error, user) => {
    if (error) {
      return res.sendStatus(403);
    }
    req.email = user.email;
    next();
  });
}

module.exports = {
  authenticateToken
}
