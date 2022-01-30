const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')
require('../db/mongoose.js')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email format');
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  email_token: {
    type: String,
  },
  isVerified: {
    type: Boolean
  },
})

// generate token api_key to each user logged in
userSchema.methods.generateAuthToken = async function () {
  // get jwt_secret from config env
  const jwtKey = config.get('token.jwtKey')
  // get the user object
  const user = this
  // sign user data with the unique id to each user
  const token = jwt.sign({
    _id: user._id.toString()
  }, jwtKey)
  return token
}

// find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  })
  // check if user existed or not 
  if (!user) throw new Error('Unable to login')
  // if user exist check if password is valid to this user
  const isMatch = await bcrypt.compare(password, user.password)
  // if password not valid through an error
  if (!isMatch) throw new Error('Unable to login')
  return user
};

// before each user was saved
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
