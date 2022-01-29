const mongoose = require('mongoose')
require('../db/mongoose.js')

const checkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  URL: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  timeInterval: {
    type: Number,
    required: true,
    default: 10 // min
  },
  timeOut: {
    type: Number,
    required: true,
    default: 5 // sec
  },
  threshold: {
    type: Number,
    required: true,
    default: 1
  },
  tags: {
    type: [String]
  },
  webhook: {
    type: String,
    default: undefined
  },
})

const Check = mongoose.model('Check', checkSchema)

module.exports = Check
