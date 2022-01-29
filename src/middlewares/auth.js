const jwt = require('jsonwebtoken')
const config = require('config')
const jwtSecret = config.get('token.jwtKey')

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['api_key'];
  const token = authHeader
  if (token == null) {
    return res.status(401).send({
      msg: 'unauthorized login'
    }) // unauthorized
  }

  jwt.verify(token, jwtSecret, (error, user) => {
    if (error) {
      return res.status(403).send({
        msg: 'forbidden request'
      })
    }
    req.email = user.email;
    next();
  });
}

module.exports = {
  authenticateToken
}
