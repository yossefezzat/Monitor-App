const User = require('../models/user')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const config = require('config')
const {
  sendVerificationMail
} = require('./emailController')


const userSignUp = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    email_token: crypto.randomBytes(64).toString('hex'),
    isVerified: false
  })
  try {
    await user.save()
    await sendVerificationMail(user, req.headers.host)
    res.send({
      'success': 'Check your email to verify your account...'
    })
  } catch (err) {
    res.status(400).json({
      msg: 'Bad request',
      errors: err.errors,
    });
  }
}

const userLogin = async (req, res) => {
  try {

    const user = await User.findByCredentials(req.body.email, req.body.password)

    const tokenUser = {
      email: user.email,
      password: user.password
    }
    if (user.isVerified === false) {
      res.status(401).send({
        msg: "you are not verified to login, please check your email to verify your account"
      })
    }
    const accessToken = await jwt.sign(tokenUser, config.get('token.jwtKey'))

    res.send({
      msg: 'you are logged in successfully',
      api_key: accessToken
    })
  } catch (e) {
    res.status(400).send(e)
  }
}

const emailVerification = async (req, res) => {
  const token = req.query.token
  const user = await User.findOne({
    email_token: token
  })
  if (!user) {
    return res.status(404).send({
      msg: 'Not Found'
    })
  }
  user.isVerified = true
  user.email_token = null
  await user.save()
  res.redirect('/')
}

// const userLogout = async (req, res) => {
//   try {
//     res.send("You are logout Successfully");
//   } catch (error) {
//     res.status(400).json(error);
//   }
// }

module.exports = {
  userSignUp,
  emailVerification,
  userLogin,
}
