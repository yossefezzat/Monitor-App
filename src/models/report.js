const mongoose = require('mongoose')
require('../db/mongoose.js')

const reportSchema = new mongoose.Schema({
  statusCode: {
    type: String,
    default: "No Status yet"
  },
  checkName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  responseTime: {
    type: Number,
    default: 0
  },
  upTime: {
    type: Number,
    default: 0
  },
  downTime: {
    type: Number,
    default: 0
  },
  availability: {
    type: Number,
    default: 0
  },
  upTimePeriod: {
    type: Number,
    default: 0
  },
  downTimePeriod: {
    type: Number,
    default: 0
  },
  averageResponseTime: {
    type: Number,
    default: 0
  },
  history: {
    type: [Object]
  },
}, {
  timestamps: true
})

const Report = mongoose.model('Report', reportSchema)

module.exports = Report
