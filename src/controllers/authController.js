const User = require('../models/user')
const crypto = require('crypto')
const {
  sendVerificationMail
} = require('./emailController')

// user signup
const userSignUp = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    email_token: crypto.randomBytes(64).toString('hex'),
    isVerified: false
  })
  try {
    const emailExisted = await User.exists({
      email: req.body.email
    })
    // check if email existed or not 
    if (emailExisted)
      return res.status(400).send({
        msg: 'Email is already existed'
      })
    // save user in case email not existed
    await user.save()
    //send verification email to keep user login later on
    sendVerificationMail(user, req.headers.host)
    res.send({
      msg: 'Check your email to verify your account...'
    })
  } catch (err) {
    res.status(400).json({
      msg: 'Credentials are not valid',
      errors: err.errors,
    });
  }
}

// user login
const userLogin = async (req, res) => {
  try {
    // check user credentials to login  
    const user = await User.findByCredentials(req.body.email, req.body.password)
    // check if user verified or not 
    if (user.isVerified === false) {
      res.status(401).send({
        msg: "you are not verified to login, please check your email to verify your account"
      })
    }
    // generate Api_key using Jwt
    const accessToken = await user.generateAuthToken()
    res.send({
      msg: 'you are logged in successfully',
      api_key: accessToken
    })
  } catch (e) {
    res.status(400).send({
      msg: 'Credentials are not valid',
      error: e.errors
    })
  }
}

// email verification
const emailVerification = async (req, res) => {
  // get the email verification token from the query in url to verify user
  const token = req.query.token
  //find the user with this email token
  const user = await User.findOne({
    email_token: token
  })
  // check if user is here or not
  if (!user) {
    return res.status(404).send({
      msg: 'user not Found'
    })
  }
  //turn isVerified status to true to keep user login later
  user.isVerified = true
  // remove email token from user object
  user.email_token = undefined
  // save user
  await user.save()
  res.redirect('/')
}

module.exports = {
  userSignUp,
  emailVerification,
  userLogin,
}
