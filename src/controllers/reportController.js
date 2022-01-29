const Report = require('../models/report')

// add new report to check.
const addNewReport = async (checkName, email) => {
  const newReport = {
    checkName,
    email
  }
  const reportExist = await Report.exists(newReport)
  if (reportExist) {
    throw new Error('report is already referenced to this check')
  }
  const report = new Report(newReport)
  await report.save()
  return `report is added to check: ${newReport.checkName}`
}

// get report by check name.
const getCheckReport = async (checkName, email) => {
  const report = await Report.findOne({
    checkName,
    email
  })
  if (!report) {
    throw new Error('No report found to this Check Name')
  }
  return report
}

// get all user reports to all checks.
const getAllReports = async (email) => {
  const reports = await Report.find({})
  if (!reports) {
    throw new Error('No reports found')
  }
  return reports
}

// update report name reference to check name
const updateReportName = async (name, email, newName) => {
  await Report.findOneAndUpdate({
    email,
    checkName: name,
  }, {
    checkName: newName
  });
  return {
    msg: "Report Name Updated"
  };
}

// delete report by check name
const deleteReport = async (checkName, email) => {
  await Report.findOneAndDelete({
    checkName,
    email
  })
  return {
    msg: `${checkName} report deleted`
  }
}

// delete all reports to user
const deleteAllReports = async (email) => {
  await Report.deleteMany({
    email
  })
  return {
    msg: `all reports deleted`
  }
}




module.exports = {
  updateReportName,
  getAllReports,
  getCheckReport,
  addNewReport,
  deleteReport,
  deleteAllReports

}
