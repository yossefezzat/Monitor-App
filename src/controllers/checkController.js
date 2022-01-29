const Check = require('../models/check')
const {
  addNewReport,
  updateReportName,
  deleteReport,
  deleteAllReports,

} = require('./reportController')

// check existance of check in user account
const checkName = async (name, email) => {
  try {
    const checkExistance = await Check.findOne({
      name: name,
      email: email
    })
    if (checkExistance) {
      return true
    } else {
      return false
    }
  } catch (e) {
    return e.message
  }
}

// Create a new check 
const createNewCheck = async (newCheck) => {
  const check = new Check(newCheck)
  //check is check name exist user Checks
  const isExist = await checkName(check.name, check.email)
  if (isExist) {
    return 'check name is already existed'
  } else if (!isExist) {
    await check.save() // save check into check model
    await addNewReport(check.name, check.email) // create a new report to this check 
    return `A new check created to Url ${check.URL}`
  } else {
    return isExist /// revise # important edit #
  }
}

// Filter check by name
const filterCheckByName = async (name, email) => {
  const check = await Check.findOne({
    name,
    email
  })
  if (check === null) {
    return 'check not found'
  }
  return check
}

// get all Auth user Checks
const getAllUserChecks = async (email) => {
  const checks = await Check.find({
    email
  })
  if (!checks) {
    return 'no checks found'
  }
  return checks
}

// Delete Check by name
const deleteCheck = async (name, email) => {
  const check = await Check.exists({
    name: name,
    email: email,
  });
  // if check is existed 
  if (!check) {
    return {
      msg: "check not found "
    };
  }
  await Check.deleteOne({
    name: name,
    email: email
  })
  await deleteReport(name, email)
  return {
    msg: "check deleted",
  };
}

// Delete all user checks 
const deleteAllChecks = async (email) => {
  await Check.deleteMany({
    email
  })
  await deleteAllReports(email)
  return {
    msg: 'all checks deleted'
  }
}

// update check url by name
const updateCheck = async (name, email, url) => {
  const check = await Check.exists({
    name,
    email
  })
  if (!check) {
    return {
      msg: 'check not found'
    }
  }
  await Check.findOneAndUpdate({
    name,
    email
  }, {
    URL: url
  })
  return {
    msg: 'check updated'
  }
}

// update check name 
const updateCheckName = async (name, email, newName) => {
  const check = await Check.exists({
    name,
    email
  })
  if (!check) {
    throw new Error('check not found')
  }
  await Check.findOneAndUpdate({
    name,
    email
  }, {
    name: newName
  })
  // update report name by new check name
  await updateReportName(name, email, newName)
  return {
    msg: 'check updated'
  }
}

// Change check status check
const doPauseCheck = async (name, email) => {
  const check = await Check.exists({
    name,
    email
  })
  if (!check) {
    return {
      msg: 'check not found'
    }
  }
  await Check.findOneAndUpdate({
    name,
    email
  }, {
    status: false
  })
  return {
    msg: 'check paused'
  }
}

// Change check paused check
const doActiveCheck = async (name, email) => {
  const check = await Check.exists({
    name,
    email
  })
  if (!check) {
    return {
      msg: 'check not found'
    }
  }
  await Check.findOneAndUpdate({
    name,
    email
  }, {
    status: true
  })
  return {
    msg: 'check activated'
  }
}




module.exports = {
  createNewCheck,
  filterCheckByName,
  getAllUserChecks,
  updateCheck,
  updateCheckName,
  deleteCheck,
  deleteAllChecks,
  doActiveCheck,
  doPauseCheck,
}
