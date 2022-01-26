const express = require('express')
const {
  userSignUp,
  emailVerification,
  userLogin,
  userLogout
} = require('../controllers/authController')

const {
  authenticateToken
} = require('../middlewares/auth')

const userRouter = new express.Router()

userRouter.post('/signUp', userSignUp)

userRouter.post('/login', userLogin)

userRouter.get('/verify-email', emailVerification)

userRouter.get('/logout', authenticateToken, userLogout)

userRouter.get('/test', authenticateToken, (req, res) => {
  res.send('helooo')
})

module.exports = userRouter
