require('dotenv').config()

module.exports = {
  app: {
    port: process.env.PORT || 3003,
  },
  database: {
    url: process.env.MONGODB_URL
  },
  email: {
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_SERVICE
  },
  token: {
    jwtKey: process.env.JWT_SECRET
  }
}
