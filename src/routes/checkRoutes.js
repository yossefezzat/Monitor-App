const express = require('express')
const {
  createNewCheck,
  getAllUserChecks,
  filterCheckByName,
  updateCheck,
  updateCheckName,
  deleteCheck,
  deleteAllChecks,
  doActiveCheck,
  doPauseCheck,

} = require('../controllers/checkController')
const {
  authenticateToken
} = require('../middlewares/auth')

const checkRouter = new express.Router()

checkRouter.post('/check/create', authenticateToken, async (req, res) => {
  const newCheck = {
    name: req.body.name,
    email: req.email,
    URL: req.body.URL,
    timeInterval: req.body.timeInterval,
    timeOut: req.body.timeOut,
    tags: req.body.tags,
    threshold: req.body.threshold,
    status: req.body.status,
    webhook: req.body.webhook
  }
  try {
    const result = await createNewCheck(newCheck)
    res.send({
      msg: result
    })
  } catch (e) {
    res.status(400).send({
      msg: e.message
    })
  }

})

// get user check by name
checkRouter.get('/check', authenticateToken, async (req, res) => {
  try {
    const checkName = req.body.name
    const check = await filterCheckByName(checkName, req.email)
    res.send({
      check
    })
  } catch (e) {
    res.status(400).send({
      'msg': e.message
    })
  }
})

//get all user checks
checkRouter.get('/checks/all', authenticateToken, async (req, res) => {
  try {
    const allChecks = await getAllUserChecks(req.email)
    res.send(allChecks) // edit the response status code 
  } catch (e) {
    res.status(400).send({
      msg: e.message
    })
  }
})

//delete user check by name
checkRouter.delete('/checks/delete', authenticateToken, async (req, res) => {
  try {
    const check = await deleteCheck(req.body.name, req.email)
    res.send(check)
  } catch (e) {
    res.status(400).send(e)
  }
})

// delete all checks
checkRouter.delete('/checks/delete/all', authenticateToken, async (req, res) => {
  try {
    const checks = await deleteAllChecks(req.email)
    res.send(checks) // edit the response status code from 200 in error case 
  } catch (e) {
    res.status(400).send(e)
  }
})

// update check URL
checkRouter.patch('/checks/update/url', authenticateToken, async (req, res) => {
  try {
    const checkUpdated = await updateCheck(req.body.name, req.email, req.body.URL)
    res.send(checkUpdated)
  } catch (e) {
    res.status(400).send({
      msg: e.message
    })
  }
})

// update check Name
checkRouter.patch('/checks/update/name', authenticateToken, async (req, res) => {
  try {
    const checkUpdated = await updateCheckName(req.body.name, req.email, req.body.newName)
    res.send(checkUpdated)
  } catch (e) {
    res.status(400).send({
      msg: e.message
    })
  }
})

// update check status -> Active
checkRouter.patch('/check/active', authenticateToken, async (req, res) => {
  try {
    const checkUpdated = await doActiveCheck(req.body.name, req.email)
    res.send(checkUpdated)
  } catch (e) {
    res.status(400).send({
      msg: e.message
    })
  }
})

// update check status -> Pause
checkRouter.patch('/check/pause', authenticateToken, async (req, res) => {
  try {
    const checkUpdated = await doPauseCheck(req.body.name, req.email)
    res.send(checkUpdated)
  } catch (e) {
    res.status(400).send({
      msg: e.message
    })
  }
})

module.exports = checkRouter
