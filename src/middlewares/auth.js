const jwt = require('jsonwebtoken')
const config = require('config')
const jwtSecret = config.get('token.jwtKey')

// auth user middleware to check for an api_key
const authenticateToken = async (req, res, next) => {
  // get the key from the header
  const token = req.headers['api_key'];
  if (token == null) {
    // unauthorized request
    return res.status(401).send({
      msg: 'Credentials are not valid'
    }) // unauthorized
  }

  jwt.verify(token, jwtSecret, (error, user) => {
    if (error) {
      // forbidden request 
      return res.status(403).send({
        msg: 'Credentials are not valid'
      })
    }
    req.email = user.email;
    next();
  });
}

module.exports = {
  authenticateToken
}
