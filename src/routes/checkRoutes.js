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
  addNewTag,
  updateTagName,
  deleteTagName,
  deleteAllTags,
  getAllChecksByTags,

} = require('../controllers/checkController')
const {
  authenticateToken
} = require('../middlewares/auth')

const checkRouter = new express.Router()

// create a new check
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

// add tag to check
checkRouter.post('/check/add/tag', authenticateToken, async (req, res) => {
  try {
    await addNewTag(req.body.name, req.email, req.body.tag)
    res.send({
      msg: 'tag is added successfully'
    })
  } catch (e) {
    res.status(400).send({
      msg: 'Unable to add the tag',
      error: e.errors
    })
  }
})

// update check tag name
checkRouter.patch('/check/update/tag', authenticateToken, async (req, res) => {
  try {
    await updateTagName(req.body.name, req.email, req.body.oldtag, req.body.newtag)
    res.send({
      msg: 'tag is updated successfully'
    })
  } catch (e) {
    res.status(400).send({
      msg: 'Unable to update the tag',
      error: e.errors
    })
  }
})

// delete check tag name
checkRouter.delete('/check/delete/tag', authenticateToken, async (req, res) => {
  try {
    await deleteTagName(req.body.name, req.email, req.body.tag)
    res.send({
      msg: 'tag is deteled successfully'
    })
  } catch (e) {
    res.status(400).send({
      msg: 'Unable to deleted the tag',
      error: e.errors
    })
  }
})

// delete all tags in check
checkRouter.delete('/check/delete/tag/all', authenticateToken, async (req, res) => {
  try {
    await deleteAllTags(req.body.name, req.email, req.body.tag)
    res.send({
      msg: 'all tags are deteled successfully'
    })
  } catch (e) {
    res.status(400).send({
      msg: 'Unable to deleted tags',
      error: e.errors
    })
  }
})

// get user checks by tagname
checkRouter.get('/check/tag', authenticateToken, async (req, res) => {
  try {
    const checks = await getAllChecksByTags(req.email, req.body.tag)
    res.send(checks)
  } catch (e) {
    res.status(400).send({
      msg: 'Unable to checks by tag',
      error: e.errors
    })
  }
})



module.exports = checkRouter
