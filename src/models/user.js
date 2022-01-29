const mongoose = require('mongoose')
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

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  })
  if (!user) throw new Error('Unable to login')
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Unable to login')
  return user
};

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
