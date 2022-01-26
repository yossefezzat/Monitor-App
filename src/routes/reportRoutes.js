const express = require('express')
const {
  getAllReports,
  getCheckReport,
} = require('../controllers/reportController')

const {
  authenticateToken
} = require('../middlewares/auth')

const reportRouter = new express.Router()

const readReport = reportRouter.get('/report/read', authenticateToken, async (req, res) => {
  try {
    const report = await getCheckReport(req.body.name, req.email)
    res.send(report)
  } catch (e) {
    res.status(400).send({
      msg: e.message
    })
  }
})

const readAllReports = reportRouter.get('/report/read/all', authenticateToken, async (req, res) => {
  try {
    const reports = await getAllReports(req.email)
    res.send(reports)
  } catch (e) {
    res.status(400).send({
      msg: e.message
    })
  }
})

const readReportByTag = reportRouter.get('/report/read/tag', authenticateToken, async (req, res) => {

})

module.exports = reportRouter
