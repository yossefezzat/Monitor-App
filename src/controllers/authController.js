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
  } catch (e) {
    res.status(500).send()
  }
}

const userLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const tokenUser = {
      email: user.email,
      password: user.password
    }
    const accessToken = await jwt.sign(tokenUser, config.get('token.jwtKey'))
    //{ maxAge: parseInt(process.env.TOKEN_MAX_AGE_IN_SEC*1000, 10) }
    res.cookie("Authorization", "Bearer " + accessToken, {
      maxAge: 60 * 1000 * 60 * 60
    })
    res.json('Loggedin')
  } catch (e) {
    res.status(400).send()
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
  res.send({
    msg: 'email verified'
  })
}

const userLogout = (req, res) => {
  try {
    res.clearCookie("Authorization");
    res.json("Cookie is destroyed! You are logout Successfully");
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  userSignUp,
  emailVerification,
  userLogin,
  userLogout
}
