const axios = require('axios')
const Check = require('../models/check')
const Report = require('../models/report')

const checkNewChecks = async (oldChecks) => {
  const newChecks = await Check.find({})
  // if user change status or add new check or update anything
  if (JSON.stringify(newChecks) === JSON.stringify(oldChecks)) {
    return false
  }
  return true
}

// get average of availability in terms of (ups | downs)
const calcAvailability = async (upTimes, downTimes) => {
  const average = (upTimes / (upTimes + downTimes)) * 100
  return average
}

// get the average of response time in terms of (ups | downs) 
const calcAvgResponseTime = async (responseTime, upTimes, downTimes, currentReponseTime) => {
  const avgResponse = (responseTime + currentReponseTime * (upTimes + downTimes - 1)) /
    (upTimes + downTimes)
  return avgResponse
}

// get all user checks
const getAllChecks = async () => {
  const checks = await Check.find()
  return checks
}

// update up time
const updateUpTime = async (checkName, email) => {
  await Report.findOneAndUpdate({
    checkName,
    email
  }, {
    $inc: {
      upTime: 1
    }
  })
}

// update downtime
const updateDownTime = async (checkName, email) => {
  await Report.findOneAndUpdate({
    checkName,
    email
  }, {
    $inc: {
      downTime: 1
    }
  })
}

// update response Time
const updateResponseTime = async (checkName, email, responseTime) => {
  await Report.findOneAndUpdate({
    checkName,
    email
  }, {
    responseTime: responseTime
  })
}

// update availibilty Time
const updateAvailibilty = async (checkName, email) => {
  const report = await Report.findOne({
    checkName,
    email
  })
  const ups = await report.upTime
  const downs = await report.downTime

  await Report.findOneAndUpdate({
    checkName,
    email
  }, {
    $set: {
      availability: await calcAvailability(ups, downs)
    }
  })
}

//update Average Response Time
const avgResonseTime = async (checkName, email, timeInterval) => {
  const report = await Report.findOne({
    checkName,
    email
  })
  const responseTime = await report.responseTime
  const upTime = await report.upTime
  const downTime = await report.downTime
  await Report.findOneAndUpdate({
    checkName,
    email
  }, {
    $set: {
      averageResponseTime: await calcAvgResponseTime(responseTime, upTime, downTime, timeInterval)
    }
  })
}

// update UpTime Period
const updateUpPeriod = async (checkName, email, upTimeInterval) => {
  await Report.findOneAndUpdate({
    checkName,
    email
  }, {
    $inc: {
      upTimePeriod: upTimeInterval
    }
  })
}

// update DownTime Period
const updateDownPeriod = async (checkName, email, downTimeInterval) => {
  await Report.findOneAndUpdate({
    checkName,
    email
  }, {
    $inc: {
      downTimePeriod: downTimeInterval
    }
  })
}

// update status code response 
const updateStatusCode = async (checkName, email, status) => {
  await Report.findByIdAndUpdate({
    checkName,
    email
  }, {
    $set: {
      statusCode: status
    }
  })
}

// create history objects with last updatedTime
const history = async (check) => {
  const report = await Report.findOne({
    email: check.email,
    checkName: check.name
  })
  const historyObject = {
    upTimes: report.upTime,
    downTimes: report.downTime,
    upTimePeriod: report.upTimePeriod,
    downTimePeriod: report.downTimePeriod,
    availability: report.availability,
    averageResponseTime: report.averageResponseTime,
    checkName: report.checkName,
    email: report.email,
    lastUpdate: report.updatedAt,
    status: report.status,
  }
  await Report.updateOne({
    email: report.email,
    checkName: report.checkName
  }, {
    $push: {
      history: historyObject
    }
  })
}


module.exports = {
  getAllChecks,
  updateUpTime,
  updateDownTime,
  updateResponseTime,
  updateAvailibilty,
  avgResonseTime,
  updateUpPeriod,
  updateDownPeriod,
  updateStatusCode,
  checkNewChecks,
  history
}
